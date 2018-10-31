import { computed } from "@ember/object";
import { reads } from "@ember/object/computed";

export const computedTask = (...args) => {
  const taskName = args.pop();

  return computed(...args, function() {
    const task = this.get(taskName);

    task.perform();

    return task;
  }).readOnly();
};

export const lastValue = taskName => reads(`${taskName}.lastSuccessful.value`);

export default {
  computedTask,
  lastValue
};
