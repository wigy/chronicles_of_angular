# Wigy's Chronicles of Angular

Wigy's collection of useful code pieces for AngularJS.

## License

Copyright (c) 2015 Tommi Ronkainen
Licensed under the GPL-2.0 license.

## Release History

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

* Support Type instance initialization directly from the constructor.
* Add class name as a part of each prototype.

### Not Yet Done

* New TypeOptions to contain options with validation.
* New TypeList to contain instances of defined other type.
* New TypeDict to contain generic object container.

## Future Ideas

* Data persistence interface `coe.store`.
* Data handling system to generate pre-loaded file to contain all data (use CoG build).