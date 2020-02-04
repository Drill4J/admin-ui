export { deleteScope } from './delete-scope';
export { finishScope } from './finish-scope';
export { toggleScope } from './toggle-scope';
export { renameScope } from './rename-scope';

type Config = { onSuccess(): void; onError: (message: string) => void };
