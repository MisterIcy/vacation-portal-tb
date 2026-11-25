<?php

declare(strict_types=1);

namespace App\Domains\Users\Controllers;

use App\Domains\Authentication\Services\AccessControlService;
use App\Domains\Users\Models\UserModel;
use App\Domains\Users\Models\UserRole;
use App\Domains\Users\Repositories\UsersRepository;
use App\Shared\JsonErrorResponse;
use DateMalformedStringException;
use JsonException;
use Laminas\Diactoros\Response\JsonResponse;
use League\Route\Http\Exception\ForbiddenException;
use OpenApi\Attributes as OA;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class UsersController
{
    public function __construct(private UsersRepository $usersRepository, private AccessControlService $accessControl)
    {
    }

    /**
     * @throws JsonException|DateMalformedStringException|ForbiddenException
     */
    public function create(ServerRequestInterface $request): ResponseInterface
    {
        $this->requireManager($request);

        /** @var array<string, string> $body */
        $body = json_decode((string) $request->getBody(), true, 512, JSON_THROW_ON_ERROR);

        $userModel = new UserModel(
            null,
            $body['email'] ?? '',
            $body['password'] ?? '', // Do not allow the password to be null
            $body['name'] ?? '',
            $body['employee_code'] ?? '',
            UserRole::from($body['role'] ?? 'employee')
        );

        $userModel = $this->usersRepository->create($userModel);

        return new JsonResponse($userModel, 201);
    }

    /**
     * @throws DateMalformedStringException|ForbiddenException
     */
    public function list(ServerRequestInterface $request): ResponseInterface
    {
        $this->requireManager($request);

        $usersCollection = $this->usersRepository->findAll();

        return new JsonResponse($usersCollection, 200);
    }

    /**
     * @param array{id: int} $params
     * @throws DateMalformedStringException|ForbiddenException
     */
    #[OA\Get(
        path: '/users/{id}',
        operationId: 'getUserById',
        description: 'Retrieve the details of the user with the provided id.',
        summary: 'Retrieve user details',
        security: [
            ['BearerAuth' => []]
        ],
        tags: ['User'],
        parameters: [
            new OA\Parameter(
                name: 'id',
                description: 'The unique ID of the user to retrieve.',
                in: 'path',
                required: true,
                schema: new OA\Schema(
                    type: 'integer',
                    example: 42,
                ),
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Successfully retrieved user',
                content: [
                    new OA\MediaType(
                        mediaType: 'application/json',
                        schema: new OA\Schema(ref: '#/components/schemas/UserModel'),
                    ),
                ],
            ),
            new OA\Response(
                ref: '#/components/responses/400',
                response: 400,
            ),
            new OA\Response(
                ref: '#/components/responses/403',
                response: 403,
            ),
            new OA\Response(
                ref: '#/components/responses/500',
                response: 500,
            ),
        ],
    )]
    public function get(ServerRequestInterface $request, array $params): ResponseInterface
    {
        $this->requireManager($request);

        $userModel = $this->usersRepository->findById((int) $params['id']);

        return new JsonResponse($userModel, 200);
    }

    /**
     * @param array{id: int} $params
     * @throws JsonException|DateMalformedStringException|ForbiddenException
     */
    public function update(ServerRequestInterface $request, array $params): ResponseInterface
    {
        $this->requireManager($request);

        /** @var array<string, string> $body */
        $body = json_decode((string) $request->getBody(), true, 512, JSON_THROW_ON_ERROR);
        $existingUserModel = $this->usersRepository->findById((int) $params['id']);

        $userModel = new UserModel(
            $existingUserModel->getId(),
            $body['email'] ?? $existingUserModel->getEmail(),
            $body['password'] ?? '',
            $body['name'] ?? $existingUserModel->getName(),
            $existingUserModel->getEmployeeCode(),
            UserRole::from($body['role'] ?? $existingUserModel->getRole()->value)
        );

        $userModel = $this->usersRepository->update($userModel);

        return new JsonResponse($userModel, 200);
    }

    /**
     * @param array{id: int} $params
     * @throws ForbiddenException
     */
    public function delete(ServerRequestInterface $request, array $params): ResponseInterface
    {
        $this->requireManager($request);
        $authenticatedUser = $this->accessControl->getAuthenticatedUserModelFromRequest($request);
        $userId = (int) $params['id'];

        if ($authenticatedUser->getId() === $userId) {
            return new JsonErrorResponse(400, 'You cannot delete your own account');
        }

        $this->usersRepository->delete($userId);

        return new JsonResponse('', 204);
    }

    /**
     * @param ServerRequestInterface $request
     * @return void
     * @throws ForbiddenException
     */
    public function requireManager(ServerRequestInterface $request): void
    {
        if (!$this->accessControl->isManagerFromRequest($request)) {
            throw new ForbiddenException();
        }
    }
}
