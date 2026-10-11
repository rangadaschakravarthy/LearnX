/**
 * LearnX JavaScript Runtime - Protocol & Type Definitions
 */

export type ExecutionEventType =
  | 'execution_started'
  | 'console_output'
  | 'runtime_error'
  | 'unhandled_rejection'
  | 'execution_completed'
  | 'execution_timeout'
  | 'execution_cancelled'
  | 'execution_resource_limit';

export type LogMethodType =
  | 'log'
  | 'info'
  | 'warn'
  | 'error'
  | 'debug'
  | 'table'
  | 'dir'
  | 'assert'
  | 'trace'
  | 'clear';

export interface ConsoleLogEntry {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error' | 'table';
  content: string;
  args?: any[];
  timestamp: number;
  seq?: number;
}

export interface ExecutionEvent {
  type: ExecutionEventType;
  sessionId: string;
  seq: number;
  timestamp: number;
  entry?: ConsoleLogEntry;
  error?: {
    name: string;
    message: string;
    stack?: string;
    line?: number;
    column?: number;
  };
  durationMs?: number;
  reason?: string;
}

export interface ExecutionOptions {
  timeoutMs?: number;
  maxLogs?: number;
  mode?: 'script' | 'module';
  onLog?: (entry: ConsoleLogEntry) => void;
  onEvent?: (event: ExecutionEvent) => void;
  onStatusChange?: (status: ExecutionStatus) => void;
}

export type ExecutionStatus = 'idle' | 'running' | 'completed' | 'timeout' | 'cancelled' | 'error';

export interface ExecutionResult {
  sessionId: string;
  logs: ConsoleLogEntry[];
  error?: string;
  durationMs: number;
  status: ExecutionStatus;
  timedOut?: boolean;
}

export interface IExecutionController {
  readonly sessionId: string;
  readonly status: ExecutionStatus;
  stop: (reason?: string) => void;
}
