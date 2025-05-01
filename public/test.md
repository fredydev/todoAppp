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

## Production Best Practices 🏭

### Gestion des Secrets 🔒

1. **AWS Secrets Manager**
   - Stocker les credentials (username/password) dans AWS Secrets Manager
   - Utiliser une rotation automatique des secrets
   - Configurer le Lambda Authorizer pour récupérer les credentials depuis Secrets Manager

2. **API Keys**
   - Implémenter une rotation régulière des API keys
   - Utiliser des API keys différentes par environnement
   - Mettre en place un système de révocation d'urgence

### Sécurité Renforcée 🛡️

1. **WAF (Web Application Firewall)**
   - Ajouter AWS WAF devant l'API Gateway
   - Configurer des règles contre les attaques communes
   - Mettre en place une protection DDoS

2. **Monitoring et Alerting**
   - Configurer des alertes CloudWatch sur :
     - Taux d'erreur anormal
     - Latence élevée
     - Tentatives d'accès non autorisées
   - Mettre en place des dashboards de monitoring

3. **Logging**
   - Centraliser les logs dans CloudWatch Logs
   - Configurer une rétention appropriée des logs
   - Implémenter un système d'analyse des logs (Athena/OpenSearch)

### Performance et Scalabilité 📈

1. **Caching**
   - Activer le cache API Gateway où approprié
   - Optimiser les TTLs selon les besoins

2. **Throttling**
   - Configurer des limites de débit par API key
   - Mettre en place une stratégie de burst

3. **Monitoring des Performances**
   - Tracer les temps de réponse
   - Surveiller l'utilisation des ressources
   - Configurer des tests de charge réguliers

### High Availability 🌐

1. **Multi-AZ**
   - Déployer dans plusieurs zones de disponibilité
   - Configurer une stratégie de failover

2. **Backup et Disaster Recovery**
   - Mettre en place des sauvegardes régulières des configurations
   - Documenter et tester le plan de reprise d'activité

### CI/CD et Déploiement 🚀

1. **Environnements**
   - Mettre en place des environnements distincts (dev, staging, prod)
   - Utiliser des variables d'environnement appropriées

2. **Tests Automatisés**
   - Tests d'intégration
   - Tests de charge
   - Tests de sécurité

3. **Déploiements**
   - Implémenter des déploiements blue/green
   - Mettre en place des rollbacks automatiques
   - Utiliser des stratégies de canary release

### Documentation et Maintenance 📚

1. **API Documentation**
   - Maintenir une documentation OpenAPI/Swagger
   - Versionner l'API
   - Documenter les changements breaking

2. **Maintenance**
   - Planifier des fenêtres de maintenance
   - Automatiser les mises à jour de sécurité
   - Maintenir un changelog

### Coûts et Optimisation 💰

1. **Monitoring des Coûts**
   - Mettre en place des budgets AWS
   - Configurer des alertes de dépassement
   - Analyser régulièrement l'utilisation

2. **Optimisation**
   - Ajuster les ressources selon l'usage
   - Optimiser les temps d'exécution Lambda
   - Nettoyer les ressources inutilisées

### Conformité et Audit 📋

1. **Conformité**
   - Implémenter la journalisation des accès
   - Configurer AWS Config
   - Maintenir une piste d'audit

2. **Revues Régulières**
   - Audits de sécurité périodiques
   - Revues des accès IAM
   - Évaluation des risques
