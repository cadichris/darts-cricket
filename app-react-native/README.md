### Infos utiles

- App Display name : "Cool Darts"
- App ID : `com.alkeya.cricket`

### Releaser une nouvelle version

Le fichier `keystore.properties` qui contient nos infos confidentielles n'est pas commit.  
Il doit être placé à la racine du projet android.  
`alkeya.keystore` doit être commit dans `android/app/`  
Ces fichiers sont commit sur notre Drive.

Pour une nouvelle release :
`yarn release --code=3 --name=1.2`

- `code` est le code technique du Play Store.À incrémenter de 1.
- `name` est le nom de la version. Utiliser une notation semver.
- `yarn info-release` permet d'obtenir les code et name courants.

Cela va taguer le repo et générer l'apk pour le store. Le process d'upload sur le store est encore manuel.

Le process pour build iOS est très manuel : https://facebook.github.io/react-native/docs/running-on-device.html#building-your-app-for-production

### Icônes

Pour générer les icônes de l'application : https://github.com/dwmkerr/app-icon  
Par contre le package est en `devDependencies` et pas en global, donc il faut utiliser `./node_modules/.bin/app-icon` pour l'exécuter.

### QR Code

Site utilisé pour générer le QR : https://www.unitag.io/fr/qrcode

### Screenshots mobiles

Site web utilisé pour générer les screenshots : https://screenshot-maker.appinstitute.com/app-screenshot-maker/

### Lancer l'app sur le simulateur Android, pour développer

Ce qui fonctionne bien est de démarrer l'émulateur Android depuis la ligne de commande, puis de démarrer l'app dessus.

- Démarrer l'émulateur :
  - `yarn emulator <nom_de_l_avd>`
  - Lister les avds : `emulator -list-avds`
  - Plus d'infos : https://developer.android.com/studio/run/emulator-commandline
- Démarrer l'app :
  - se placer dans le répertoire de l'app
  - `yarn android`

Après ça, l'app devrait se lancer dans l'émulateur.

### Storybook

Suivre [la doc Storybook](https://github.com/storybooks/storybook/tree/master/app/react-native#create-react-native-app-crna) pour utiliser Storybook.

### Prettier

Le format du code repose sur Prettier. Il s'exécute en precommit hook.  
`yarn pretty` pour une exécution ponctuelle.
