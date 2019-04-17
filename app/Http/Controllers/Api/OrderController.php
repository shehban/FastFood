<?php

namespace App\Http\Controllers\Api;

use App\Order;
use Auth;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $orders = Order::all();
        $orders = DB::table('orders')
        ->join('order_items','orders.id','=','order_items.orderid')
        ->join('users','users.id','=','orders.user_id')
        ->join('products','products.id','=','order_items.productid')
        ->select('orders.address','orders.phone','users.name','products.productname','order_items.quantity','orders.created_at')
        ->where('delivered','=','false')
        ->get();
        return response()->json($orders);
    }

    public function getorderlocations() {
        $orderlocation =  DB::table('orders')
        ->join('users','orders.user_id','=','users.id')
        ->select(DB::raw('TIMESTAMPDIFF(MINUTE,orders.created_at,NOW()) AS time_diff'),'orders.id','orders.address','orders.phone','orders.customer_name','orders.latitude','orders.longitude','orders.created_at')
        ->where('latitude','!=',0)
        ->where('delivered','=','false')
        ->get();
        return response()->json($orderlocation);   
    }

    public function getMyOrders() {
        $user = Auth::id();
        $myorders = DB::table('orders')
        ->select('id','user_id','address','phone','delivered','customer_name')
        ->where('user_id','=',$user)
        ->get();
        return response()->json($myorders);
    }

    public function gettime() {
        $timeDifference = DB::table('orders')
        ->select(DB::raw('TIMESTAMPDIFF(MINUTE,created_at,NOW()) AS time_diff'))
        ->where('latitude','!=',0)
        ->where('delivered','=','false')
        ->get();
        return response()->json($timeDifference);
    }

    public function highestorder() {
        $maxorder = DB::table('orders')->max('id');
        return $maxorder;
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = new Order();
        $order->user_id = $request->get('userid');
        $order->customer_name = $request->get('name');
        $order->address = $request->get('Address');
        $order->phone = $request->get('Phone');
        $order->latitude = $request->get('lat');
        $order->longitude = $request->get('lng');
        $order->delivered = false;

        $order->save();

        return $order;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $orderlocation =  DB::table('orders')
        ->select('latitude','longitude')
        ->where('id','=',$id)
        ->get();
        return response()->json($orderlocation);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        DB::table('orders')
            ->where('id',$id)
            ->update(['delivered' => true]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
