from django.shortcuts import render


from .serializers import loginserializers,registerserializers,albumserializers
from .models import login,register,album
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.mail import send_mail


class registerApi(GenericAPIView):

    serializer_class=loginserializers
    serializer_class_register=registerserializers

    def post(self,request):
        login_id=''
        image=request.data.get('image')
        name=request.data.get('name')
        email=request.data.get('email')
        contact=request.data.get('contact')
        password=request.data.get('password')
        if(login.objects.filter(email=email)):
            return Response({'message':'duplicate user found !'},status=status.HTTP_400_BAD_REQUEST)
        serializer_login=self.serializer_class(data={'email':email,'password':password})
        print(serializer_login)
        if(serializer_login.is_valid()):
            log=serializer_login.save()
            login_id=log.id
        serializer_reg=self.serializer_class_register(data={'name':name,'contact':contact,'log_id':login_id,'image':image})
        print(serializer_reg) 
        if serializer_reg.is_valid():
            serializer_reg.save()
            return Response({'data':serializer_reg.data,'message':'Registerd successfully','success':True},status=status.HTTP_201_CREATED)
        return Response({'data':serializer_reg.errors,'message':'failed','success':False},status=status.HTTP_400_BAD_REQUEST)
    

# class getregister(GenericAPIView):
#     serializer_class=registerserializers
#     def get(self,request):
#         queryset=register.objects.all()
#         if(queryset.count()>0):
#             serializer=registerserializers(queryset,many=True)
#             return Response({'data':serializer.data,'message':'all product set','success':True},status=status.HTTP_200_OK)
#         return Response({'data':'no data available','success':False},status=status.HTTP_400_BAD_REQUEST)


class LoginUserAPIView(GenericAPIView):
   serializer_class=loginserializers
   def post(self,request):
    email=request.data.get('email')
    password=request.data.get('password')
    logreg=login.objects.filter(email=email,password=password)
    if(logreg.count()>0):
        read_serializer=loginserializers(logreg,many=True)
        for i in read_serializer.data:
            id=i ['id']
            print(id)
        regdata=register.objects.all().filter(log_id=id).values()
        print(regdata)
        for i in regdata:
            name=i['name']
            user_id=i['id']
        return Response({'data':{'login_id':id,'name':name,'user_id':user_id,'email':email,'password':password},'message':'login success','success':True},status=status.HTTP_200_OK)
    else:
        return Response({'data':'invalid credentials','success':False},status=status.HTTP_400_BAD_REQUEST)


class getsingleuserview(GenericAPIView):
    serializer_class=registerserializers
    def get(self,request,id):
        queryset=register.objects.filter(log_id=id).values()
        return Response({'data':queryset,'message':'get user data','success':True},status=status.HTTP_200_OK)
    
class getloginuserview(GenericAPIView):
    serializer_class=loginserializers
    def get(self,request,id):
        queryset=login.objects.filter(pk=id).values()
        return Response({'data':queryset,'message':'get login data','success':True},status=status.HTTP_200_OK)
    

class updateprofile(GenericAPIView):
    serializer_class=registerserializers
    serializer_class_register=loginserializers
    def put(self,request,id):
       name=request.data.get('name')
       contact=request.data.get('contact')
       image=request.data.get('image')
       email=request.data.get('email')
       password=request.data.get('password')
       queryset=register.objects.get(log_id=id)
       queryset2=login.objects.get(pk=id)
       print(queryset)
       print(queryset2)
       serializer_reg=registerserializers(instance=queryset,data={'name':name,'contact':contact,'image':image},partial=True)
       serializer_log=loginserializers(instance=queryset2,data={'email':email,'password':password},partial=True)
       print(serializer_reg)
       print(serializer_log)
       if serializer_reg.is_valid() and serializer_log.is_valid():
        serializer_reg.save()
        serializer_log.save()
        return Response({'data':serializer_reg.data,'data2':serializer_log.data ,'message':'updated successfully','success':True},status=status.HTTP_201_CREATED)
       return Response({'data':serializer_reg.errors,'message':'failed','success':False},status=status.HTTP_400_BAD_REQUEST)
    

class GetalluserDetails(GenericAPIView):
    serializer_class=registerserializers
    def get(self,request):
        queryset=register.objects.all()
        if(queryset.count()>0):
            serializer=registerserializers(queryset,many=True)
            return Response({'data':serializer.data,'message':'all show set','success':True},status=status.HTTP_200_OK)
        return Response({'data':[],'message':'no data available','success':False},status=status.HTTP_400_BAD_REQUEST)
    

class addalbumApi(GenericAPIView):
    serializer_class=albumserializers
    def post(self,request):
        picture=request.data.get('picture')
        id=request.data.get('id')
        serializer=self.serializer_class(data={'picture':picture,'pic_id':id})
        if serializer.is_valid():
            serializer.save()
        return Response({'data':serializer.data})
    
class getallalbum(GenericAPIView):
    serializer_class=albumserializers
    def get(self,request,id):
        queryset=album.objects.filter(pic_id=id).values()
        return Response({'data':queryset,'message':'get album data','success':True},status=status.HTTP_200_OK)
    

class mail(GenericAPIView):
     def post(self, request):
        id=request.data.get('id')
        value=register.objects.get(log_id=id)
        value2=login.objects.get(id=id)
        mail=value2.email
        name=value.name
        print(name)
        message = f' {mail}     Mr.{name} - a new photo has been uploaded.'
        print(message)
        queryset=login.objects.all()
        recipient_list=[] 
        print(queryset)
        for i in queryset:
            recipient_list.append(i.email)
        print(recipient_list)
        send_mail(
            'Photo Upload Notification',  # Subject
            message,  # Message
            settings.DEFAULT_FROM_EMAIL,
            recipient_list,  # To
            fail_silently=False
        )
        
        return Response({'message': 'Email sent successfully'})
        


    






