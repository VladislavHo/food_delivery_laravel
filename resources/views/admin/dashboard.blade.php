@extends('layouts.app')

@section('content')

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">{{ __('Dashboard') }}</div>

          <div class="card-body">
            {{ session('status') }}
            @if (session('status'))
              <div class="alert alert-success" role="alert">
                <h4>THIS IS ALL USERS</h4>
                <ul>

                    @foreach ($users as $user)
                        <li>
                            <strong>ID: {{$user->id}}</strong> <br>
                            <strong>Name:</strong> {{ $user->name }} <br>
                            <strong>Email:</strong> {{ $user->email }}
                        </li>

                        {{-- <a href="{{ route('users.edit', $user->id) }}" class="btn btn-warning">Edit</a> --}}
                        <form action="{{ route('users.destroy', $user->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </form>
                    @endforeach

                </ul>
              </div>
            @endif
          </div>
        </div>
      </div>
    </div>
  </div>
@endSection