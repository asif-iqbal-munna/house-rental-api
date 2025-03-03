import fs from 'fs';
import path from 'path';

function generateInterface(moduleName: string) {
  const capitalizedModuleName = capitalize(moduleName);

  return `import { Document, Model } from 'mongoose';


// ${capitalizedModuleName} Schema Definition
export interface I${capitalizedModuleName} extends Document {
  name: string;
  status: boolean;
}

export interface I${capitalizedModuleName}Methods {
  getFullName(): string;
}

export type ${capitalizedModuleName}Model = Model<I${capitalizedModuleName}, Record<string, unknown>, I${capitalizedModuleName}Methods>;`;
}

function generateModel(moduleName: string) {
  const capitalizedModuleName = capitalize(moduleName);

  return `import { Schema, model } from 'mongoose';
import { I${capitalizedModuleName}, I${capitalizedModuleName}Methods, ${capitalizedModuleName}Model } from './${moduleName}.interface';

const ${moduleName}Schema = new Schema<I${capitalizedModuleName}, ${capitalizedModuleName}Model, I${capitalizedModuleName}Methods>({
  name: { type: String, required: true },
  status: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export const ${capitalizedModuleName} = model<I${capitalizedModuleName}, ${capitalizedModuleName}Model>('${capitalizedModuleName}', ${moduleName}Schema);`;
}

function generateRoutes(moduleName: string) {
  const capitalizedModuleName = capitalize(moduleName);

  return `import { Router } from 'express';
import { ${capitalizedModuleName}Controller } from './${moduleName}.controller';

const router = Router();

// Define routes
router.post('/', ${capitalizedModuleName}Controller.handleCreate${capitalizedModuleName});

export const ${moduleName}Routes = router;`;
}

function generateController(moduleName: string) {
  const capitalizedModuleName = capitalize(moduleName);

  return `import { RequestHandler } from 'express';
import { ${capitalizedModuleName}Service } from './${moduleName}.service';

export const handleCreate${capitalizedModuleName}: RequestHandler = async (req, res, next) => {
  try {
    const data = await ${capitalizedModuleName}Service.create${capitalizedModuleName}IntoDb(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const ${capitalizedModuleName}Controller = {
  handleCreate${capitalizedModuleName},
};`;
}

function generateService(moduleName: string) {
  const capitalizedModuleName = capitalize(moduleName);

  return `import { ${capitalizedModuleName} } from './${moduleName}.model';
import { I${capitalizedModuleName} } from './${moduleName}.interface';
const create${capitalizedModuleName}IntoDb = (data: I${capitalizedModuleName}) => {
    return ${capitalizedModuleName}.create(data);
  }
export const ${capitalizedModuleName}Service = {
  create${capitalizedModuleName}IntoDb,
};`;
}

function generateValidation(moduleName: string) {
  const capitalizedModuleName = capitalize(moduleName);

  return `import { z } from 'zod';

export const create${capitalizedModuleName}ValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: '${capitalizedModuleName} name is required',
    }),
    status: z.boolean().optional(),
  }),
});

export const update${capitalizedModuleName}ValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    status: z.boolean().optional(),
  }),
});

export const ${moduleName}Validation = {
  create: create${capitalizedModuleName}ValidationSchema,
  update: update${capitalizedModuleName}ValidationSchema,
};`;
}
// Function to create a module with dynamic files
const createModule = (moduleName: string): void => {
  const baseDir = path.join(__dirname, '../', 'app', 'modules', moduleName);

  // List of files to be created
  const files = [
    `${moduleName}.routes.ts`,
    `${moduleName}.controller.ts`,
    `${moduleName}.model.ts`,
    `${moduleName}.service.ts`,
    `${moduleName}.interface.ts`,
    `${moduleName}.validation.ts`,
  ];

  // Create the module directory
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
    console.log(`Directory created: ${baseDir}`);
  } else {
    console.log(`Directory already exists: ${baseDir}`);
  }

  // Create each file with basic content
  files.forEach((file) => {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) {
      let content = '';

      // Basic template for each file
      if (file.endsWith('.routes.ts')) {
        content = generateRoutes(moduleName);
      } else if (file.endsWith('.controller.ts')) {
        content = generateController(moduleName);
      } else if (file.endsWith('.service.ts')) {
        content = generateService(moduleName);
      } else if (file.endsWith('.interface.ts')) {
        content = generateInterface(moduleName);
      } else if (file.endsWith('.model.ts')) {
        // Template for the model.ts file
        content = generateModel(moduleName);
      } else if (file.endsWith('.validation.ts')) {
        content = generateValidation(moduleName);
      }

      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`File created: ${filePath}`);
    } else {
      console.log(`File already exists: ${filePath}`);
    }
  });
};

// Utility function to capitalize the module name
const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Get the module name from command-line arguments
const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Please provide a module name.');
  process.exit(1);
}

// Execute the function
createModule(moduleName);
