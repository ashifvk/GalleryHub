from django.contrib import admin
from .models import login,register,album
# Register your models here.
admin.site.register(login)
admin.site.register(register)
admin.site.register(album)