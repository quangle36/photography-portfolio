import { NextResponse } from "next/server"

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    detail?: any
  }
  metadata?: {
    page?: number
    limit?: number
    total?: number
    timestamp: string
  }
}

export class ResponseBuilder {
  static success<T>(
    data: T,
    status: number = 200,
    metadata?: Omit<ApiResponse<T>["metadata"], "timestamp">
  ) {
    const response: ApiResponse<T> = {
      success: true,
      data,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
      },
    }
    return NextResponse.json(response, { status })
  }

  static error(
    message: string,
    status: number = 500,
    code: string = "INTERNAL_SERVER_ERROR",
    details?: any
  ) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code,
        message,
        ...(details && { details }),
      },
      metadata: {
        timestamp: new Date().toISOString(),
      },
    }

    return NextResponse.json(response, { status })
  }

  static notFound(
    message: string = "Resource not found",
    code: string = "NOT_FOUND"
  ) {
    return this.error(message, 404, code)
  }

  static badRequest(
    message: string = "Invalid request",
    code: string = "BAD_REQUEST",
    details?: any
  ) {
    return this.error(message, 400, code, details)
  }

  static unauthorized(
    message: string = "Unauthorized access",
    code: string = "UNAUTHORIZED"
  ) {
    return this.error(message, 401, code)
  }

  static forbidden(
    message: string = "Access forbidden",
    code: string = "FORBIDDEN"
  ) {
    return this.error(message, 403, code)
  }

  static validationError(errors: any) {
    return this.badRequest("Validation failed", "VALIDATION_ERROR", errors)
  }

  static paginatedSuccess<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    status: number = 200
  ) {
    return this.success(data, status, {
      page,
      limit,
      total,
    })
  }
}
