from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout, get_user_model
User = get_user_model()
from django.contrib.auth.decorators import login_required
from .models import UserProfile

def landing(request):
    return render(request, "landing.html")


def signup_view(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")
        user_type = request.POST.get("user_type")  # "student" or "organizer"

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect("signup")

        # Either get existing user or create a new one
        user, created = User.objects.get_or_create(username=email, defaults={
            "email": email,
            "first_name": name
        })

        if created:
            user.set_password(password)
            user.save()

        # Check if profile for this role already exists
        if not UserProfile.objects.filter(user=user, user_type=user_type).exists():
            UserProfile.objects.create(user=user, user_type=user_type)
            messages.success(request, f"Signed up successfully as {user_type}!")
        else:
            messages.error(request, f"User already registered as {user_type}.")
            return redirect("signup")

        return redirect("login")

    return render(request, "login.html")




def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user_type = request.POST.get("user_type")

        user = authenticate(request, username=email, password=password)

        if user is not None:
            # Check if a profile exists for the requested user_type
            try:
                profile = UserProfile.objects.get(user=user, user_type=user_type)
                login(request, user)
                if profile.user_type == "student":
                    return redirect("student-dashboard")
                elif profile.user_type == "organizer":
                    return redirect("organizer-dashboard")
            except UserProfile.DoesNotExist:
                messages.error(request, f"No {user_type} account found for this email. Please check your selection or sign up.")
                return redirect("signup")
        else:
            messages.error(request, "Invalid email or password.")
            return redirect("login")

    return render(request, "login.html")



def logout_view(request):
    logout(request)
    return redirect("landing")


@login_required
def student_dashboard(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user , user_type="student")
    return render(request, "student-dashboard.html", {
        "user": request.user,
        "profile": profile
    })

@login_required
def organizer_dashboard(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user , user_type="organizer")
    return render(request, "organizer-dashboard.html", {
        "user": request.user,
        "profile": profile
    })

@login_required
def save_profile(request):
    if request.method == "POST":
        profile, created = UserProfile.objects.get_or_create(user=request.user)

        # Save contact number
        contact_number = request.POST.get("contact_number")
        if contact_number:
            profile.contact_number = contact_number

        # Save avatar if uploaded
        if "avatar" in request.FILES:
            profile.avatar = request.FILES["avatar"]

        profile.save()
        messages.success(request, "Profile updated successfully!")

        # Redirect back to correct dashboard
        if profile.user_type == "student":
            return redirect("student-dashboard")
        elif profile.user_type == "organizer":
            return redirect("organizer-dashboard")

    return redirect("landing")