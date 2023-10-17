from django.db import models

# Create your models here.
class login(models.Model):
    email=models.CharField(max_length=30)
    password=models.CharField(max_length=30)

class album(models.Model):
    picture=models.ImageField(upload_to='gallery/',null=True)
    pic_id=models.ForeignKey(login,on_delete=models.CASCADE)


class register(models.Model):
    name=models.CharField(max_length=30)
    contact=models.CharField(max_length=30)
    image=models.ImageField(upload_to='images/',null=True)
    log_id=models.ForeignKey(login,on_delete=models.CASCADE)


