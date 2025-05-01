# Guide d'Utilisation de l'API SNS

Ce guide explique comment utiliser l'API pour envoyer des messages au topic SNS depuis n'importe quelle application ou service.

> **Note Importante**: Bien que cette API ait été conçue initialement pour l'intégration avec Azure DevOps, elle fonctionne comme une API REST standard. Pour l'utiliser avec d'autres services, vous avez deux options :
> 1. Désactiver la vérification de l'IP source dans le déploiement CloudFormation (`VerifyIpSource: false`)
> 2. Ajouter votre plage d'IP dans la liste des IPs autorisées dans le Custom Authorizer

## 🔐 Prérequis

Pour utiliser l'API, vous aurez besoin des éléments suivants :

1. URL de l'API Gateway
2. Identifiants d'authentification (username/password)
3. Clé API (x-api-key)

## 📡 Endpoint

- **Méthode**: POST
- **URL**: `https://<api-id>.execute-api.<region>.amazonaws.com/prod/notification`

## 🔑 Authentification

L'API utilise une double authentification :

1. **Basic Auth**:
   ```
   Authorization: Basic <base64(username:password)>
   ```

2. **API Key**:
   ```
   x-api-key: votre-api-key
   ```

## 📝 Format de la Requête

### Headers
```http
Content-Type: application/json
Authorization: Basic <base64(username:password)>
x-api-key: votre-api-key
```

### Body
```json
{
  "Message": "Votre message",
  "Subject": "Sujet du message (optionnel)"
}
```

## 🧪 Exemples

### cURL
```bash
curl -X POST \
  'https://<api-id>.execute-api.<region>.amazonaws.com/prod/notification' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=' \
  -H 'x-api-key: votre-api-key' \
  -d '{
    "Message": "Test de notification",
    "Subject": "Test API"
  }'
```

### Python
```python
import requests
import base64

url = "https://<api-id>.execute-api.<region>.amazonaws.com/prod/notification"
username = "votre-username"
password = "votre-password"
api_key = "votre-api-key"

# Création du header Basic Auth
auth_string = f"{username}:{password}"
auth_bytes = auth_string.encode('ascii')
base64_auth = base64.b64encode(auth_bytes).decode('ascii')

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Basic {base64_auth}',
    'x-api-key': api_key
}

data = {
    'Message': 'Test de notification',
    'Subject': 'Test API'
}

response = requests.post(url, json=data, headers=headers)
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
```

### JavaScript/Node.js
```javascript
const axios = require('axios');

const url = 'https://<api-id>.execute-api.<region>.amazonaws.com/prod/notification';
const username = 'votre-username';
const password = 'votre-password';
const apiKey = 'votre-api-key';

// Création du header Basic Auth
const auth = Buffer.from(`${username}:${password}`).toString('base64');

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${auth}`,
  'x-api-key': apiKey
};

const data = {
  Message: 'Test de notification',
  Subject: 'Test API'
};

axios.post(url, data, { headers })
  .then(response => {
    console.log('Status:', response.status);
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response?.data || error.message);
  });
```

## ⚠️ Codes d'Erreur

- **401**: Authentification invalide (Basic Auth)
- **403**: API Key invalide ou manquante
- **400**: Format de requête invalide
- **500**: Erreur interne du serveur

## 🔍 Debugging

1. Vérifiez que tous les headers sont correctement configurés
2. Assurez-vous que le body est au format JSON valide
3. Confirmez que l'URL de l'API est correcte
4. Vérifiez les logs CloudWatch en cas d'erreur

### Gestion des IPs

Si vous recevez une erreur 403 avec un message concernant l'IP source :

1. **Option 1 - Désactiver la vérification IP**:
   - Modifiez le paramètre `VerifyIpSource` à `false` dans le template CloudFormation
   - Redéployez la stack

2. **Option 2 - Ajouter votre IP**:
   - Identifiez votre plage IP (IPv4)
   - Modifiez la liste `AZDO_IP_RANGES` dans le code du Custom Authorizer
   - Ajoutez votre plage IP au format CIDR (ex: "203.0.113.0/24")
   - Redéployez la stack

> **Note**: L'option 2 est recommandée en production pour maintenir un niveau de sécurité optimal.

## 📚 Bonnes Pratiques

1. **Gestion des Erreurs**:
   - Implémentez une logique de retry avec backoff exponentiel
   - Gérez tous les codes d'erreur possibles

2. **Sécurité**:
   - Ne stockez jamais les credentials en clair dans votre code
   - Utilisez des variables d'environnement ou un gestionnaire de secrets
   - Faites tourner régulièrement vos API keys

3. **Monitoring**:
   - Surveillez les taux d'erreur
   - Mettez en place des alertes sur les échecs
   - Gardez un œil sur la latence des requêtes

## 🤝 Support

Pour toute question ou problème :
1. Consultez les logs CloudWatch
2. Contactez l'équipe responsable de l'API
3. Fournissez l'ID de requête en cas d'erreur
