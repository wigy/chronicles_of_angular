# Wigy's Chronicles of Angular

Wigy's collection of useful code pieces for AngularJS.

## License

Copyright (c) 2015 Tommi Ronkainen
Licensed under the GPL-2.0 license.

## Release History

* v0.3.0
    - Support fully *Chronicles of Grunt* build system.
    - Documentation for existing code.
* v0.2.0
    - New d() dump utility and audio player. Rename keyHandler to coaKeyHandler.
* v0.1.0
    - keyHandler directive.

## Next Version

### Done

* Update API docs to use ngdocs.
* Implement type system with few types: string, integer and object.
* Generic Data instance factory.

### Not Yet Done


## Future Ideas

* Document coding conventions (Uppercase models, module directory structure).
* Data persistence interface `coe.store`.
* Data handling system to generate pre-loaded file to contain all data (use CoG build).
* Template handling system to compile all templates into pre-loaded cache content (use CoG build).
* Find out is it possible to make consistent handling for classes, i.e. factory generated object
  is an instance of class injected directly to function. (See factory_spec.js)
