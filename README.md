<p align="center">
  <img src="/logo/orval-logo-horizontal.png?raw=true" width="500" height="160" alt="orval - Restfull Client Generator" />
</p>
<h3 align="center">
  Inspired by <a href="https://github.com/contiamo/restful-react">restful-react</a>
</h3>

## Summary

- [Code Generation](#code-generation)
  - [Usage](#usage)
  - [Samples](#samples)
  - [Validation of the OpenAPI specification](#validation-of-the-openapi-specification)
  - [Import from GitHub](#import-from-github)
  - [Transforming an Original Spec](#transforming-an-original-spec)
  - [Advanced configuration](#advanced-configuration)
    - [Config File Format](#config-file-format)
    - [Config File Example](#config-file-example)

### Code Generation

`orval` is able to generate client with appropriate type-signatures (TypeScript) from any valid OpenAPI v3 or Swagger v2 specification, either in `yaml` or `json` formats.

#### Usage

Type-safe data fetchers can be generated from an OpenAPI specification using the following command:

- `orval --input MY_OPENAPI_SPEC.yaml --output my-awesome-generated-types.tsx`

This command can be invoked by _either_:

- Installing `orval` globally and running it in the terminal: `npm i -g orval`, or
- Adding a `script` to your `package.json` like so:

```diff
      "scripts": {
        "start": "webpack-dev-server",
        "build": "webpack -p",
+       "generate-fetcher": "orval --input MY_SWAGGER_DOCS.json --output FETCHERS.tsx"
      }
```

Your client can then be generated by running `npm run generate-fetcher`. Optionally, we recommend linting/prettifying the output for readability like so:

```diff
      "scripts": {
        "start": "webpack-dev-server",
        "build": "webpack -p",
        "generate-fetcher": "orval --input MY_SWAGGER_DOCS.json --output FETCHERS.tsx",
+       "postgenerate-fetcher": "prettier FETCHERS.d.tsx --write"
      }
```

### Samples

You can find below some samples on codesandbox

- [react app](https://github.com/anymaniax/orval/tree/master/samples/react-app)
- [react app with react query](https://github.com/anymaniax/orval/tree/master/samples/react-app-with-react-query)
- [angular app](https://github.com/anymaniax/orval/tree/master/samples/angular-app)

#### Validation of the OpenAPI specification

To enforce the best quality as possible of specification, we have integrated the amazing [OpenAPI linter from IBM](https://github.com/IBM/openapi-validator). We strongly encourage you to setup your custom rules with a `.validaterc` file, you can find all useful information about this configuration [here](https://github.com/IBM/openapi-validator/#configuration).

#### Import from GitHub

Using an url in input like this `orval --input https://github.com/OAI/OpenAPI-Specification/blob/master/examples/v3.0/petstore.yaml` allows us to **create your client from an OpenAPI spec _remotely hosted on GitHub._** <sup>_(how is this real life_ 🔥 _)_</sup>

To generate components from remote specifications, you'll need to follow the following steps:

1.  Visit [your GitHub settings](https://github.com/settings/tokens).
1.  Click **Generate New Token** and choose the following:

        Token Description: (enter anything)
        Scopes:
            [X] repo
                [X] repo:status
                [X] repo_deployment
                [X] public_repo
                [X] repo:invite

1.  Click **Generate token**.
1.  Copy the generated string.
1.  Open a terminal and run `orval --input https://github.com/OAI/OpenAPI-Specification/blob/master/examples/v3.0/petstore.yaml`, substituting things where necessary.
1.  You will be prompted for a token.
1.  Paste your token.
1.  You will be asked if you'd like to save it for later. This is _entirely_ up to you and completely safe: it is saved in your `node_modules` folder and _not_ committed to version control or sent to us or anything: the source code of this whole thing is public so you're safe.

    **Caveat:** _Since_ your token is stored in `node_modules`, your token will be removed on each `npm install` of `orval`.

1.  You're done! 🎉

#### Transforming an Original Spec

In some cases, you might need to augment an existing OpenAPI specification on the fly, for code-generation purposes.

Transfomer example:

```ts
// /path/to/my-transformer.js

/**
 * Transformer function for orval.
 *
 * @param {OpenAPIObject} schema
 * @return {OpenAPIObject}
 */
module.exports = (inputSchema) => ({
  ...inputSchema,
  // Place your augmentations here
  paths: Object.entries(schema.paths).reduce(
    (mem, [path, pathItem]) => ({
      ...mem,
      [path]: Object.entries(pathItem).reduce(
        (pathItemMem, [verb, operation]) => ({
          ...pathItemMem,
          [verb]: {
            ...fixOperationId(path, verb, operation),
          },
        }),
        {},
      ),
    }),
    {},
  ),
});
```

#### Advanced configuration

`orval` supports the concept of "schema stitching" in a RESTful ecosystem as well. We are able to tie multiple backends together and generate code using a single configuration file, `orval.config.js`

To activate this "advanced mode", replace all flags from your `orval` call with the config flag: `--config orval.config.js` (or any filename that you want).

⚠️ **Note:** using a config file makes use of all of the options contained therein, and ignores all other CLI flags.

##### Config File Format

```ts
interface RestfulClientConfig {
  [backend: string]: {
    // path or output options object
    output?: string | OutputOptions;
    // path, url, or input options object
    input?: string | InputOptions;
  };
}

type OverrideInput = {
  transformer?: string;
};

interface InputOptions = {
    // path or url to the openapi spec
    target?: string;
    // validation of your openapi spec
    validation?: boolean;
    // override the input that's give you the possibility to add whatever you want to your openapi spec
    override?: OverrideInput;
};

type OutputClient = 'axios' | 'angular' | 'react-query';

export type OutputMode = 'single' | 'split' | 'tags' | 'tags-split';

type MockProperties =
  | { [key: string]: unknown }
  | ((specs: OpenAPIObject) => { [key: string]: unknown });

type OperationOptions = {
  transformer?: string;
  mutator?: string;
  mock?: {
    data?: MockProperties;
    properties?: MockProperties;
  };
};


type OverrideOutput = {
  transformer?: string;
  mutator?: string;
  operations?: { [key: string]: OperationOptions };
  mock?: {
    properties?: MockProperties;
  };
};

interface OutputOptions = {
  // override title
  title?: (title: string) => string
  // default axios
  client?: OutputClient
  // path to the file which will contains the implementation
  target?: string;
  // path to the directory that will contains your models (if not define the target will contains the schemas)
  schemas?: string;
  // single to have everything in the same file
  // split to have definition, implementation, schemas, mock in differents files
  // tags to have a file by tag
  // tags-split a mix of tags and split
  mode?: OutputMode;
  // add mock to your implementation
  // old version will be removed in the next major version
  mock?: boolean | 'old-version';
  // override the output like your mock implementation or transform the api implementation like you want
  override?: OverrideOutput;
};
```

##### Config File Example

```js
// orval.config.js
module.exports = {
  'petstore-file': {
    input: 'examples/petstore.yaml',
    output: 'examples/petstoreFromFileSpecWithConfig.ts',
  },
  'petstore-file-transfomer': {
    output: {
      target: 'examples/petstoreFromFileSpecWithTransformer.ts',
      schemas: 'examples/model',
      mode: 'split',
      mock: true,
    },
    input: {
      target: 'examples/petstore.yaml',
      transformer: 'examples/transformer-add-version.js',
    },
    override: {
      // contains operationId of your spec with override options
      operations: {
        listPets: {
          // mutator the output of your api call
          mutator: 'examples/transformer-response-type.js',
          mock: {
            // override mock properties
            properties: () => {
              return {
                id: faker.random.number({ min: 1, max: 9 }),
              };
            },
          },
        },
        showPetById: {
          mock: {
            // override mock for this api call
            data: () => ({
              id: faker.random.number({ min: 1, max: 99 }),
              name: faker.name.firstName(),
              tag: faker.helpers.randomize([faker.random.word(), undefined]),
            }),
          },
        },
      },
      mock: {
        // override mock properties for all api calls
        properties: {
          '/tag|name/': 'jon',
        },
      },
    },
  },
};
```

```json
// package.json
{
  "scripts": {
    "gen": "orval --config orval.config.js",
    "gen-first": "orval --config orval.config.js myFirstBackend"
  }
}
```
