# Wigy's Chronicles of Angular

Wigy's collection of useful code pieces for AngularJS.

## License

Copyright (c) 2015 Tommi Ronkainen
Licensed under the GPL-2.0 license.

## Release History

* v0.5.3
    - `TypeAny` to allow any non-undefined value.
* v0.5.2
    - *TypeTuple* providing options `types` defining list of element types.
    - Sub-classes *TypePair* and *TypeTriple* of *TypeTuple*.
    - Override better defaults `{}` and `[]` for *TypeDict* and *TypeList*.
* v0.5.1
    - Fix prototype of TypeOptions.
* v0.5.0
    - Add class name as a part of each prototype.
    - Support Type instance initialization directly from the constructor.
    - Change the Data initialization pattern to use Type instances.
    - New TypeList to contain instances of some defined other type.
    - New TypeDict as generic object container.
    - New TypeOptions to contain options with validation.
* v0.4.2
    - Fix invalid reference in TimeStr.diff().
* v0.4.1
    - Fix distribution files and version number.
* v0.4.0
    - Update API docs to use ngdocs.
    - Implement type system with few types: boolean, string, integer and object.
    - Data and option validation.
    - Generic Data instance factory.
* v0.3.0
    - Support fully *Chronicles of Grunt* build system.
    - Documentation for existing code.
    - New d() dump utility and audio player.
    - keyHandler directive.

## Next Version

### Done

* Use new neat-dump instead of own implementation of d().

### Not Yet Done

* Data persistence interface `coa.store` with in-memory implementation.

## Future Ideas

* Data persistence engines for mongodb and rest-api.
* Builder task for collecting data from JSON-files and setting up in-memory storage for single-file application (use CoG build).
* Use https://github.com/kofrasa/mingo/ if installed, when parsing search filters.
* Rendering for every class with member `html(context)`, where *context* is RenderingContext instance
  (to be defined).
* Page structure descriped by page.json files in the configured project directory tree.
* Builder task for pages in single file application (use CoG build).
* Application configuration mechanism to provide different settings for production and developement.