from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.urls import reverse

from TikoEnergy.forms import UserForm


@login_required()
def welcome(request):
    context = {
    }
    return render(request, 'index.html', context)

@login_required()
def graph(request):
    context = {
    }
    return render(request, 'graph.html', context)


@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('TikoEnergy:welcome'))


def register(request):
    registered = False
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        if user_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            registered = True
    else:
        user_form = UserForm()
    return render(request, 'registration.html',
                  {'user_form': user_form,
                   'registered': registered})


def user_login(request):
    context = {
        'err_msg': None
    }
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect(reverse('TikoEnergy:welcome'))
            else:
                context['err_msg'] = "Your account is not active."
                return render(request, 'login.html', {context})
        else:
            context['err_msg'] = "Invalid login details"
            return render(request, 'login.html', context)
    else:
        return render(request, 'login.html', context)
