<?php

namespace App\Domains\Authentication\Requests;

use OpenApi\Attributes as OA;
use Psr\Http\Message\ServerRequestInterface;

#[OA\Schema(
    title: 'LoginRequest',
    description: 'Data structure for user authentication.',
    type: 'object',
)]
class LoginRequest
{
    #[OA\Property(
        description: 'The user\'s email address',
        example: 'john.doe@example.com'
    )]
    private string $email;
    #[OA\Property(
        description: 'The user\'s password',
        format: 'password',
        example: 'SecureP@ss123',
    )]
    private string $password;

    public function __construct(ServerRequestInterface $request)
    {
        /** @var array<string, string> $body */
        $body = json_decode((string) $request->getBody(), true, 512, JSON_THROW_ON_ERROR);
        $this->email = $body['email'] ?? '';
        $this->password = $body['password'] ?? '';
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}
