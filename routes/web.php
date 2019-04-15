<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::any('{all}', function () {
//     return view('welcome');
// })->where(['all' => '.*']);

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('order/location', 'Api\OrderController@getorderlocations');

Route::get('products', function() {
    return App\product::all();
});

Route::get('users', function() {
    return App\User::all();
});

Route::post('add', 'cartController@add');

Route::get('cart', function() {
    return Cart::getContent();
});

Route::get('clear', function() {
    $clear = Cart::clear();
    if($clear) {
        return Cart::getContent();
    }
});

Auth::routes();

Route::get('/orders', 'OrderController@index')->name('orders');

Route::get('/', 'HomeController@index')->name('home.index');

Route::prefix('admin')->group(function() {
    Route::get('/login', 'Auth\AdminLoginController@showLoginForm')->name('admin.login');
    Route::post('/login', 'Auth\AdminLoginController@login')->name('admin.login.submit');
    Route::get('/', 'AdminController@index')->name('admin.dashboard');
});