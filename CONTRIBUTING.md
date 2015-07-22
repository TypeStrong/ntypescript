# Release

## Quickly

Quick workflow (runs `prepare` and `release`):

```sh
quick.sh
```

## Manually

```sh
prepare.sh
```

Manual verification here ... then:

```sh
release.sh
npm publish
```

## globals

You can try the globals using:

```
npm link
```

# Inspiration
https://github.com/Arnavion/typescript-github

# Travis
* NPM deploy setup by simply running `travis setup npm` (you get `travis` from `gem install travis`). Then setup the API key using https://github.com/npm/npm/issues/8970#issuecomment-122854271 
* Cron job setup using https://nightli.es/  (we also tried http://traviscron.pythonanywhere.com/ but it didn't work).
