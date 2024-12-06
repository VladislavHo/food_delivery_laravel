<?php


namespace App\Telegram;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
;
use Log;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class AuthController extends Controller
{
    use AuthenticatesUsers;
    public function redirectToTelegram()
    {
        $botToken = env('TELEGRAM_BOT_TOKEN');
        $loginUrl = "https://telegram.me/$botToken?start=login";

        return redirect("https://telegram.me/$botToken?start=login", 302);
    }

    public function handleTelegramCallback(Request $request)
    {
        try {
            $data = $request->all();
    
            // Проверка на наличие необходимых данных
            if (!isset($data['id'])) {
                return response()->json(['error' => 'Missing Telegram ID'], 400);
            }
    
            $user = User::firstOrCreate([
                'telegram_id' => $data['id'],
            ], [
                'first_name' => $data['first_name'] ?? '', // Если отсутствует, передаем пустую строку
                'last_name' => $data['last_name'] ?? '',
                'username' => $data['username'] ?? '',
                'photo_url' => $data['photo_url'] ?? '',
                'hash' => $data['hash'] ?? '',
            ]);
            
            $token = $user->createToken('Telegram Token')->plainTextToken;
            Auth::login($user);

            $auth = auth()->user();

            
            Log::info('auth' . $auth);


            if (!$auth) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            redirect('/profile');
            return response()->json(['token' => $token]);
        } catch (\Exception $e) {
            Log::error('Error in Telegram callback: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}