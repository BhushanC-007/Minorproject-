from django.contrib.auth.models import AbstractUser
from django.db import models


# Custom user (built-in fields: username/email/password/first_name, etc.)
class User(AbstractUser):
    # nothing extra for now
    pass


class UserProfile(models.Model):
    USER_TYPES = (
        ("student", "Student"),
        ("organizer", "Organizer"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profiles")
    user_type = models.CharField(max_length=20, choices=USER_TYPES)
    contact_number = models.CharField(max_length=20, blank=True, null=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)

    class Meta:
        unique_together = ("user", "user_type")  # 👈 prevents duplicates

    def __str__(self):
        return f"{self.user.username} ({self.user_type})"




