# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).

## [Unreleased]
### Added
- Added [`preferred-alias`] rule
### Fixed
- [`no-extraneous-args`] now handles aliases.

## [1.1.3] - 2016-05-02
### Fixed
- Fix false positives being returned for any Lodash method used that did not match [`consistent-compose`] method name option ([#14], thanks [@kavington])

## [1.1.2] - 2016-05-01
### Fixed
- Crash in [`no-submodule-destructuring`] when doing `var {foo} = bar;` ([#13], thanks [@kavington])
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
- Added [`no-fp`] rule

[`consistent-compose`]: ./docs/rules/consistent-compose.md
[`consistent-name`]: ./docs/rules/consistent-name.md
[`no-argumentless-calls`]: ./docs/rules/no-argumentless-calls.md
[`no-chain`]: ./docs/rules/no-chain.md
[`no-extraneous-args`]: ./docs/rules/no-extraneous-args.md
[`no-extraneous-function-wrapping`]: ./docs/rules/no-extraneous-function-wrapping.md
[`no-for-each`]: ./docs/rules/no-for-each.md
[`no-fp`]: ./docs/rules/no-fp.md
[`no-single-composition`]: ./docs/rules/no-single-composition.md
[`no-submodule-destructuring`]: ./docs/rules/no-submodule-destructuring.md
[`prefer-compact`]: ./docs/rules/prefer-compact.md
[`prefer-composition-grouping`]: ./docs/rules/prefer-composition-grouping.md
[`prefer-constant`]: ./docs/rules/prefer-constant.md
[`prefer-flat-map`]: ./docs/rules/prefer-flat-map.md
[`prefer-get`]: ./docs/rules/prefer-get.md
[`prefer-identity`]: ./docs/rules/prefer-identity.md
[`preferred-alias`]: ./docs/rules/preferred-alias.md

[`eslint-plugin-lodash`]: https://github.com/wix/eslint-plugin-lodash

[#14]: https://github.com/jfmengels/eslint-plugin-lodash-fp/pull/14
[#13]: https://github.com/jfmengels/eslint-plugin-lodash-fp/pull/13
[#11]: https://github.com/jfmengels/eslint-plugin-lodash-fp/pull/11

[@jfmengels]: https://github.com/jfmengels
[@izaakschroeder]: https://github.com/izaakschroeder
[@kavington]: https://github.com/kavington

[Unreleased]: https://github.com/jfmengels/eslint-plugin-lodash-fp/compare/v1.1.3...master
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
