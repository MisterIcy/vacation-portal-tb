<?php

declare(strict_types=1);

namespace App\Domains\Users\Models;

use OpenApi\Attributes as OA;

#[OA\Schema(
    description: 'The user\'s role',
    type: 'string',
    enum: ['manager', 'employee'],
    example: 'manager'
)]
enum UserRole: string
{
    case Manager = 'manager';
    case Employee = 'employee';
}
