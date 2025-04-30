# Intégration Azure DevOps - AWS SNS

Ce projet fournit une intégration sécurisée entre Azure DevOps et AWS SNS via API Gateway, permettant l'envoi de notifications depuis Azure DevOps vers des topics SNS.

## 🏗️ Architecture

```
Azure DevOps → API Gateway → SNS Topic → Subscribers
                    ↓
            Sécurité à 3 niveaux
                    ↓
     Authorizer | API Key | IP Verification
```

> **Note**: La souscription par email au topic SNS n'est présente que pour des fins de test. En production, utilisez d'autres types de souscriptions (Lambda, SQS, HTTP/HTTPS, etc.) selon vos besoins.

## 🔐 Mécanismes de Sécurité

Le template CloudFormation implémente trois niveaux de sécurité, chacun pouvant être activé/désactivé via des paramètres :

### 1. Custom Authorizer
- **Production**: ✅ **REQUIS**
- **POC/Dev**: ⚡ Optionnel
- **Fonction**: Authentification basique (username/password)
- **Activation**: Paramètre `CustomAuthorizer: "true"|"false"`

### 2. API Key
- **Production**: ✅ **REQUIS**
- **POC/Dev**: ⚡ Optionnel
- **Fonction**: Clé d'API pour l'authentification des requêtes
- **Activation**: Paramètre `APIKey: "true"|"false"`

### 3. Vérification IP Source
- **Production**: 🔄 OPTIONNEL
- **POC/Dev**: ⚡ Optionnel
- **Fonction**: Vérifie si l'IP source appartient aux plages Azure DevOps
- **Activation**: Paramètre `VerifyIpSource: "true"|"false"`
- **Note**: Peut rester optionnel même en production si l'intégration est utilisée avec d'autres services que Azure DevOps

## 🚀 Déploiement

### Paramètres de Configuration

```yaml
Parameters:
  NotificationEmail:    # Email pour les tests uniquement
    Type: String
    Default: your-email@domain.com
    Description: Email address for testing SNS notifications (not for production use)

  CustomAuthorizer:     # Activer l'authentification personnalisée
    Type: String
    Default: "true"
    AllowedValues: ["true", "false"]

  APIKey:              # Activer la clé d'API
    Type: String
    Default: "true"
    AllowedValues: ["true", "false"]

  VerifyIpSource:      # Activer la vérification d'IP
    Type: String
    Default: "true"
    AllowedValues: ["true", "false"]
```

### Recommandations de Sécurité

#### Pour la Production
```yaml
CustomAuthorizer: "true"   # REQUIS
APIKey: "true"            # REQUIS
VerifyIpSource: "true"    # Optionnel, selon le contexte
```

#### Pour le Développement/POC
```yaml
CustomAuthorizer: "false"  # Optionnel
APIKey: "false"           # Optionnel
VerifyIpSource: "false"   # Optionnel
```

## 📝 Notes Importantes

1. **Sécurité en Production**:
   - L'Authorizer et l'API Key sont **OBLIGATOIRES** en production
   - Ces mécanismes assurent une double couche de sécurité indispensable

2. **Vérification IP**:
   - Reste optionnelle même en production
   - Utile principalement pour les intégrations Azure DevOps
   - Peut être désactivée pour d'autres cas d'usage

3. **Flexibilité**:
   - La configuration modulaire permet d'adapter la sécurité selon le contexte
   - Idéal pour les environnements de test et les POCs

## 🛠️ Maintenance

- Mettre à jour régulièrement les plages IP d'Azure DevOps dans le code de l'Authorizer
- Vérifier périodiquement les logs CloudWatch pour détecter les tentatives d'accès non autorisées
- Faire tourner régulièrement les API Keys en production

## 🧪 Test avec Azure DevOps

Une fois l'infrastructure CloudFormation déployée, suivez ces étapes pour configurer et tester l'intégration :

1. Dans Azure DevOps :
   - Accédez à **Project Settings**
   - Sélectionnez **Service Hooks**
   - Cliquez sur le **+** pour créer une nouvelle souscription

2. Configuration du Webhook :
   - Sélectionnez **Web Hooks** dans la liste des services
   - Suivez les instructions jusqu'à la vue "Action"

3. Configuration de l'Action :
   - URL : Renseignez l'URL de l'API Gateway
   - Authentification :
     - Username/Password : Credentials de l'Authorizer
     - Header `x-api-key` : Votre clé API (obligatoire en production)

4. Test de l'Intégration :
   - Cliquez sur le bouton **Test**
   - Vérifiez la réception du message dans votre boîte email (en environnement de test)
   - Consultez les logs CloudWatch pour confirmer le bon fonctionnement

> **Note**: Les captures d'écran détaillées seront ajoutées ultérieurement pour illustrer chaque étape.

## 📚 Documentation Additionnelle

- [Azure DevOps IP Ranges](https://learn.microsoft.com/en-us/azure/devops/organizations/security/allow-list-ip-url)
- [AWS API Gateway Security](https://docs.aws.amazon.com/apigateway/latest/developerguide/security.html)
- [AWS SNS Security](https://docs.aws.amazon.com/sns/latest/dg/sns-security.html)
