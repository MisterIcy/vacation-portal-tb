<?php

declare(strict_types=1);

namespace App\Docs;

use OpenApi\Attributes as OA;

#[OA\OpenApi(
    openapi: '3.1.0',
    info: new OA\Info(
        version: '1.0.0',
        description: 'Vacation management API for streamlining requesting and evaluating vacation requests.',
        title: 'Vacation Management API',
    ),
    servers: [
        new OA\Server(url: 'http://localhost:8080', description: 'Development Server'),
    ],
)]
class ApiDocumentation
{
    // This class is just a container for the global OpenApi information
}
