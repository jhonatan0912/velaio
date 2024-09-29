import { Injector } from '@angular/core';
import { TasksService } from '@services/tasks.service';

export const appInitializer = (injector: Injector) => {
  const tasksService = injector.get(TasksService);

  return () => {
    return new Promise<void>((resolve) => {
      tasksService.init();

      resolve();
    });
  };
};