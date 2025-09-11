from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserProfile


class UserProfileInline(admin.StackedInline):
    """
    Allows editing UserProfile directly within the User admin page.
    """
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profiles'
    fk_name = 'user'


class CustomUserAdmin(UserAdmin):
    """
    Custom User admin to display the UserProfile inline.
    """
    inlines = (UserProfileInline, )


# Register your models here.
admin.site.register(User, CustomUserAdmin)
admin.site.register(UserProfile)
