
#  Identity Portal

## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#installation)
1. [Running the Project](#running-the-project)
1. [Testing](#testing)
1. [Notes](#notes)

## Requirements
* node `^5.0.0`
* npm `^3.0.0`

## Installation

```bash
$ git clone git@github.com:justmx/kt_app.git
$ cd kt_app
$ npm install
```

## Running the Project

```bash
$ npm start
```

## Testing

```bash
$ npm test
```

## Notes

1. It takes around 6 hours to get to this point.
2. Latest version of react and redux is used in this application and basically most features are achieved including SignIn form with basic validation, file upload with progress bar showing.
3. FileUploadProgress components should be wrapper in the redux circle and proper Mock API should be created. For now it is just a show case for deleting files, API call should be called to remove files remotely. Testing is not fully covered and need to style the pages with better presentation.
4. The business logic for document type needs to be keep improving. The Passport type needs to be checked and determine if it is an Australian passport or not. For now it just assumes the mandatory file is Passport (Other countries) and supporting files is compulsory as well.
4. The whole app is built using a fractal structure which means each route has its own components and containers under its own folder.
With fractal structure routes can be bundled into 'chunks' using webpack if needed. Route reducer can be lazy loaded into store when needed. However, it is not the case
for this small project.

5. React, redux, thunk to build the basic structure of the application. Redux-form to provider validations and form submit work flow. React-boostrap and react-widgets to provide basic form components and layouts.
