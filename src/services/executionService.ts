import { ExecutionEngine } from './runtime/executionEngine';
import { ConsoleLogEntry, ExecutionOptions, ExecutionResult, IExecutionController } from './runtime/types';

export class ExecutionService {
  /**
   * Executes JavaScript code inside an isolated Web Worker with complete asynchronous capture,
   * supervisor timeout, streaming logs, and session isolation.
   *
   * @param code JavaScript source string
   * @param timeoutMs Maximum allowed execution time in ms (default 10,000ms / 10s)
   * @param onLog Optional callback for real-time incremental log streaming
   */
  static executeCode(
    code: string,
    timeoutMs = 10000,
    onLog?: (entry: ConsoleLogEntry) => void
  ): Promise<ExecutionResult> {
    const { promise } = ExecutionEngine.execute(code, {
      timeoutMs,
      onLog,
    });
    return promise;
  }

  /**
   * Full streaming execution API with cancellation controller.
   */
  static executeStreaming(
    code: string,
    options: ExecutionOptions = {}
  ): { promise: Promise<ExecutionResult>; controller: IExecutionController } {
    return ExecutionEngine.execute(code, options);
  }

  /**
   * Cancels any ongoing execution session immediately.
   */
  static cancelCurrent(): void {
    ExecutionEngine.cancelCurrentExecution('Stopped by user');
  }
}
