from .models import login,register,album
from rest_framework import serializers


class loginserializers(serializers.ModelSerializer):
    class Meta:
        model=login
        fields='__all__'

class registerserializers(serializers.ModelSerializer):
    class Meta:
        model=register
        fields='__all__'

class albumserializers(serializers.ModelSerializer):
    class Meta:
        model=album
        fields='__all__'