<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class AdminController extends Controller
{
      /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {

        $users = User::all();
        
        if (auth()->user()->getAttribute('role') != 'admin') {
            return view('welcome');
        }
        session()->flash('status', 'Successfully retrieved all users.');
        return view('admin.dashboard', compact('users'));
    }
}

