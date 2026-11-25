<?php

declare(strict_types=1);

namespace App\Shared;

use Laminas\Diactoros\Response\JsonResponse;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'JsonErrorResponse',
    title: 'JSON API Error Response',
    description: 'A standard error object returned by the API for 4xx and 5xx status codes.',
)]
final class JsonErrorResponse extends JsonResponse
{
    public function __construct(
        #[OA\Property(
            property: 'status_code',
            description: 'The HTTP status code of the error response.',
            example: 400,
        )]
        int $statusCode,
        #[OA\Property(
            property: 'reason_phrase',
            description: 'A short, human-readable summary of the error (e.g., "Bad Request", "Unauthorized").',
            example: 'Internal Server Error',
        )]
        string $reasonPhrase
    ) {
        parent::__construct(
            [
                'status_code' => $statusCode,
                'reason_phrase' => $reasonPhrase,
            ],
            $statusCode,
        );
    }
}
