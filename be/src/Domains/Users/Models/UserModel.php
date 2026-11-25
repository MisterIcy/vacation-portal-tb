<?php

declare(strict_types=1);

namespace App\Domains\Users\Models;

use DateTime;
use InvalidArgumentException;
use JsonSerializable;
use OpenApi\Attributes as OA;

#[OA\Schema(
    title: 'UserModel',
    description: 'Data structure for a user model.',
    type: 'object',
)]
readonly class UserModel implements JsonSerializable
{
    #[OA\Property(
        description: 'The user\'s unique identifier',
        example: '42',
        nullable: false,
    )]
    private ?int $id;
    #[OA\Property(
        description: 'The user\'s email address',
        example: 'john.doe@example.com',
    )]
    private string $email;
    private ?string $password;
    #[OA\Property(
        description: 'The user\'s name',
        example: 'John Doe',
    )]
    private string $name;
    #[OA\Property(
        property: 'employee_code',
        description: 'The user\'s employee code',
        example: '1234567',
    )]
    private string $employeeCode;
    #[OA\Property(
        ref: '#/components/schemas/UserRole',
        description: 'The user\'s role',
    )]
    private UserRole $role;
    #[OA\Property(
        property: 'created_at',
        description: 'Date and time when the user was created',
        example: '2024-01-15T10:00:00Z',
        nullable: false,
    )]
    private ?DateTime $createdAt;
    #[OA\Property(
        property: 'updated_at',
        description: 'Date and time when the user was last updated',
        example: '2024-01-15T10:00:00Z',
        nullable: false,
    )]
    private ?DateTime $updatedAt;

    public function __construct(
        ?int      $id,
        string    $email,
        ?string   $password,
        string    $name,
        string    $employeeCode,
        UserRole  $role,
        ?DateTime $createdAt = null,
        ?DateTime $updatedAt = null
    ) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email address.');
        }

        if ($password !== null && strlen($password) < 8) {
            throw new InvalidArgumentException('Password must be at least 8 characters if provided.');
        }

        if (empty(trim($name))) {
            throw new InvalidArgumentException('Name must not be empty.');
        }

        if (!preg_match('/^\d{7}$/', $employeeCode)) {
            throw new InvalidArgumentException('Employee code must be a 7 digit number.');
        }

        $this->id = $id;
        $this->email = $email;
        $this->password = $password;
        $this->name = trim($name);
        $this->employeeCode = $employeeCode;
        $this->role = $role;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getEmployeeCode(): string
    {
        return $this->employeeCode;
    }

    public function getRole(): UserRole
    {
        return $this->role;
    }

    public function getCreatedAt(): ?DateTime
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?DateTime
    {
        return $this->updatedAt;
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'name' => $this->name,
            'employee_code' => $this->employeeCode,
            'role' => $this->role->value,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}
