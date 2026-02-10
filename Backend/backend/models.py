from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    title = models.CharField(max_length=200)
    About = models.TextField(null=True, blank=True)
    description = models.TextField()
    salary_range = models.CharField(max_length=20)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    posted_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, verbose_name=("created by"), on_delete=models.CASCADE)

    def __str__(self):
        return self.title   

class Application(models.Model):
    status_choices = (
        ('pending', 'Pending'),
        ('shortlisted', 'Shortlisted'),
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted')
    ) 
    applicant = models.ForeignKey(User, verbose_name=("applicant"), on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='pending', choices=status_choices)
    applied_at = models.DateTimeField(auto_now_add=True)
    job = models.ForeignKey(Job, related_name='applicants', on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    cover_letter = models.TextField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"{self.applicant.username} - {self.job.title}"
    