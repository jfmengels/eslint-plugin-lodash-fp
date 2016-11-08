# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).

## [Unreleased]
- (none)

## [2.1.3] - 2016-11-08
### Fixed
- Fixed [`no-single-composition`] by allowing array expressions with multiple elements ([#42], thanks [@iam4x]).

### Misc
- Replaced [`ast-utils`] by [`eslint-ast-utils`] (package was renamed).
- Replaced `isStaticRequire` function by the similarly named function in [`eslint-ast-utils`].

## [2.1.2] - 2016-11-03
### Fixed
- Fixed [`no-extraneous-function-wrapping`] not handling some constructs (now uses [ast-utils]).

## [2.1.1] - 2016-10-14
### Fixed
- Fixed [`no-single-composition`] triggering errors when using spread arguments.

## [2.1.0] - 2016-10-10
### NOTE
- This was published as a `minor` version by accident. It should have been a `patch`.

### Fixed
- Fixed incorrect errors for [`use-fp`] on package names starting with `lodash-` ([#41, thanks [@penny-five])

## [2.0.1] - 2016-08-24
### Fixed
- Fixed crash in `no-extraneous-function-wrapping` when using `return` without an argument.
- Fixed false report in `no-extraneous-function-wrapping` when using the last argument twice in the arguments ([#38], thanks [@godu]).

## [2.0.0] - 2016-07-15
### Removed
- **Breaking**: Removed support for Node.js versions < v4.

### Fixed
- Fixed documentation for [`prefer-composition-grouping`].
- Added suggestion in [`prefer-composition-grouping`] to use [`_.overEvery`]/[`_.overSome`] to replace multiple [`_.filter`]/[`_.reject`].
- Added an exception for [`_.bindAll`] in [`no-unused-result`] ([#36], thanks [@dfadler]).

### Changed
- Removed [`eslint`] as a dependency.

## [1.3.0] - 2016-05-26
### Added
- Added [`no-unused-result`] rule

### Fixed
- Fixed [`prefer-composition-grouping`]'s error message ([#30], thanks [@gunar]).
- Fixed [`no-extraneous-iteratee-args`]'s error message.
- [`prefer-composition-grouping`] now handles aliases, and can report multiple errors in the same flow construct.

### Changed
- [`no-for-each`] now also reports uses of [`_.forIn`] and [`_.forOwn`].

## [1.2.0] - 2016-05-08
### Added
- Added [`no-extraneous-iteratee-args`] rule
- Added [`no-partial-of-curried`] rule
- Added [`preferred-alias`] rule

### Fixed
- [`no-extraneous-args`] now also handles aliases.
- Fixed crash in [`no-extraneous-function-wrapping`].

### Changed
- [`no-extraneous-args`] now recommends an alternative whenever possible, and tells when to use an array for method that used rest args.

## [1.1.3] - 2016-05-02
### Fixed
- Fix false positives being returned for any Lodash method used that did not match [`consistent-compose`] method name option ([#14], thanks [@kavington])

## [1.1.2] - 2016-05-01
### Fixed
- Crash in [`no-submodule-destructuring`] when doing `const {foo} = bar;` ([#13], thanks [@kavington])
- Typo in recommended configuration ([#13], thanks [@kavington])

## [1.1.1] - 2016-04-30
### Fixed
- Problems with `npm` while publishing, added missing files.

## [1.1.0] - 2016-04-30
### Added
- Added [`no-extraneous-args`] rule
- Added [`no-for-each`] rule

## [1.0.2] - 2016-04-29
### Fixed
- Fix typo preventing the package from loading ([#11], thanks [@izaakschroeder])

## [1.0.1] - 2016-04-28
### Fixed
- Problems with `npm` while publishing, added missing files.

## [1.0.0] - 2016-04-28
### Added
- Added [`prefer-compact`] rule
- Added [`prefer-identity`] rule
- Added [`prefer-composition-grouping`] rule
- Added [`no-submodule-destructuring`] rule
- Added [`no-argumentless-calls`] rule
- Added [`prefer-flat-map`] rule
- Added [`prefer-constant`] rule from [`eslint-plugin-lodash`]
- Added [`prefer-get`] rule from [`eslint-plugin-lodash`]

## [0.1.0] - 2016-04-20
### Added
- Added [`no-extraneous-function-wrapping`] rule
- Added [`no-single-composition`] rule

## [0.0.3] - 2016-04-15
### Added
- Added [`consistent-name`] rule

## [0.0.2] - 2016-04-14
### Added
- Added [`consistent-compose`] rule

## 0.0.1 - 2016-04-12
### Added
- Added [`no-chain`] rule
- Added [`use-fp`] rule

[`consistent-compose`]: ./docs/rules/consistent-compose.md
[`consistent-name`]: ./docs/rules/consistent-name.md
[`no-argumentless-calls`]: ./docs/rules/no-argumentless-calls.md
[`no-chain`]: ./docs/rules/no-chain.md
[`no-extraneous-args`]: ./docs/rules/no-extraneous-args.md
[`no-extraneous-function-wrapping`]: ./docs/rules/no-extraneous-function-wrapping.md
[`no-extraneous-iteratee-args`]: ./docs/rules/no-extraneous-iteratee-args.md
[`no-for-each`]: ./docs/rules/no-for-each.md
[`no-partial-of-curried`]: ./docs/rules/no-partial-of-curried.md
[`no-single-composition`]: ./docs/rules/no-single-composition.md
[`no-submodule-destructuring`]: ./docs/rules/no-submodule-destructuring.md
[`no-unused-result`]: ./docs/rules/no-unused-result.md
[`prefer-compact`]: ./docs/rules/prefer-compact.md
[`prefer-composition-grouping`]: ./docs/rules/prefer-composition-grouping.md
[`prefer-constant`]: ./docs/rules/prefer-constant.md
[`prefer-flat-map`]: ./docs/rules/prefer-flat-map.md
[`prefer-get`]: ./docs/rules/prefer-get.md
[`prefer-identity`]: ./docs/rules/prefer-identity.md
[`preferred-alias`]: ./docs/rules/preferred-alias.md
[`use-fp`]: ./docs/rules/use-fp.md

[`_.bindAll`]: https://lodash.com/docs#filter
[`_.filter`]: https://lodash.com/docs#filter
[`_.forIn`]: https://lodash.com/docs#forIn
[`_.forOwn`]: https://lodash.com/docs#forOwn
[`_.overEvery`]: https://lodash.com/docs#overEvery
[`_.overSome`]: https://lodash.com/docs#overSome
[`_.reject`]: https://lodash.com/docs#reject

[`ast-utils`]: https://github.com/jfmengels/eslint-ast-utils
[`eslint-ast-utils`]: https://github.com/jfmengels/eslint-ast-utils
[`eslint`]: https://github.com/eslint/eslint
[`eslint-plugin-lodash`]: https://github.com/wix/eslint-plugin-lodash

[#42]: https://github.com/jfmengels/eslint-plugin-lodash-fp/pull/42
[#36]: https://github.com/jfmengels/eslint-plugin-lodash-fp/pull/36
[#14]: https://github.com/jfmengels/eslint-plugin-lodash-fp/pull/14
[#11]: https://github.com/jfmengels/eslint-plugin-lodash-fp/pull/11

[#41]: https://github.com/jfmengels/eslint-plugin-lodash-fp/issues/41
[#38]: https://github.com/jfmengels/eslint-plugin-lodash-fp/issues/38
[#30]: https://github.com/jfmengels/eslint-plugin-lodash-fp/issues/30
[#13]: https://github.com/jfmengels/eslint-plugin-lodash-fp/pull/13

[@dfadler]: https://github.com/dfadler
[@godu]: https://github.com/godu
[@gunar]: https://github.com/gunar
[@izaakschroeder]: https://github.com/izaakschroeder
[@jfmengels]: https://github.com/jfmengels
[@kavington]: https://github.com/kavington
[@penny-five]: https://github.com/penny-five
[@iam4x]: https://github.com/iam4x

[Unreleased]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v2.1.3...master
[2.1.3]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v2.1.2...v2.1.3
[2.1.2]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v1.3.0...v2.0.0
[1.3.0]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v1.1.2...v1.2.0
[1.1.3]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v0.0.3...v0.1.0
[0.0.3]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v0.0.1...v0.0.2
