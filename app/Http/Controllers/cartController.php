<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cart;
use App\Product;

class cartController extends Controller
{
  public function add(Request $res) {
    $quantity = $res->quantity;
    $id = $res->id;
    $data = Product::find($id);

    Cart::add([
        'id' => $id,
        'name' => $data->productname,
        'price' => $data->price,
        'quantity' => $quantity,
        'image' => $data->image,
        'attributes' => []
    ]);
  }
}
