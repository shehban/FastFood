<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Fast Food.</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="/css/app.css" type="text/css" rel="stylesheet">
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNX8JajMOFizPrqQ3soycokrIoe8dXswE&libraries=geometry,drawing,places&language=en"></script>
    </head>
    <body>
      <div id="header">
      </div>      
      <div id="navigation">
    <ul class="navbar-nav ml-auto float-right">
                        <!-- Authentication Links -->
                        @guest
                        <div class="row">
                            <li class="nav-item col-sm-6">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item col-sm-6">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                                </div>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul></div>
      <div id="body">
      </div>
      <div id="example"></div>
      <div id="footer"></div>
      <script>
    let globalData = {!! $globalData->toJson() !!};
    </script>
    </body>
    <script src="/js/app.js"></script>
   
</html>
