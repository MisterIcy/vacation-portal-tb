<?php

declare(strict_types=1);

namespace App\Docs;

use OpenApi\Attributes as OA;

/**
 * This class holds all reusable components for the API specification.
 */
#[OA\Components(
    responses: [
        new OA\Response(
            response: 400,
            description: 'Bad Request.',
            content: new OA\JsonContent(
                ref: '#/components/schemas/JsonErrorResponse',
            ),
        ),
        new OA\Response(
            response: 401,
            description: 'Unauthorized.',
            content: new OA\JsonContent(
                ref: '#/components/schemas/JsonErrorResponse',
            ),
        ),
        new OA\Response(
            response: 403,
            description: 'Forbidden.',
            content: new OA\JsonContent(
                ref: '#/components/schemas/JsonErrorResponse',
            ),
        ),
        new OA\Response(
            response: 500,
            description: 'Internal Server Error.',
            content: new OA\JsonContent(
                ref: '#/components/schemas/JsonErrorResponse',
            ),
        ),
    ],
    securitySchemes: [
        new OA\SecurityScheme(
            securityScheme: 'BearerAuth',
            type: 'http',
            description: 'JWT based authentication',
            bearerFormat: 'JWT',
            scheme: 'bearer',
        ),
    ],
)]
class ApiComponents
{
    // This class is purely for holding documentation attributes
}
