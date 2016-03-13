# Wigy's Chronicles of Angular

Wigy's collection of useful code pieces for AngularJS.

## License

Copyright (c) 2015 Tommi Ronkainen
Licensed under the GPL-2.0 license.

## Release History

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

* *TypeTuple* providing options `types` defining list of element types.

### Not Yet Done

* Sub-classes *TypePair* and *TypeTriple* of *TypeTuple*.
* Override better defaults `{}` and `[]` for *TypeDict* and *TypeList*.

## Future Ideas

* Data persistence interface `coe.store`.
* Data handling system to generate pre-loaded file to contain all data (use CoG build).
* Write short introduction about "define once, use everywhere".