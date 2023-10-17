from django.urls import path,include
from . import views

urlpatterns = [
    path("registerApi",views.registerApi.as_view(),name='registerApi'),
    # path("getregister",views.getregister.as_view(),name='getregister'),
    path("LoginUserAPIView",views.LoginUserAPIView.as_view(),name='LoginUserAPIView'),
    # path("AddshowAPI",views.AddshowAPI.as_view(),name='AddshowAPI'),
    path("GetalluserDetails",views.GetalluserDetails.as_view(),name='GetalluserDetails'),
    # path('deleteshow/<int:id>',views.deleteshow.as_view(),name='deleteshow'),
    path('updateprofile/<int:id>',views.updateprofile.as_view(),name='updateprofile'),
    path('getsingleuserview/<int:id>',views.getsingleuserview.as_view(),name='getsingleuserview'),
    path('getloginuserview/<int:id>',views.getloginuserview.as_view(),name='getloginuserview'),
    path('getallalbum/<int:id>',views.getallalbum.as_view(),name='getallalbum'),
    path('addalbumApi',views.addalbumApi.as_view(),name='addalbumApi'),
    path('mail',views.mail.as_view(),name='mail'),
    
]
