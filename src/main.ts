
import { RecetaView } from "./views/RecetaView.js";
import { StorageService } from "./services/StorageService.js";
import { RecetaController } from "./controllers/RecetaController.js";

const view = new RecetaView();
const storage = new StorageService();

new RecetaController(view, storage);
