# 🚀 INSTRUÇÕES PARA VISUALIZAR A PÁGINA

## ⚠️ IMPORTANTE: URL CORRETA

A página está rodando em:
```
http://localhost:8080
```

**NÃO use** `127.0.0.1:5500` ou `localhost:3000` - use a porta 8080!

## 📋 Passos para visualizar:

1. **Certifique-se de que o servidor está rodando:**
   - Abra o terminal na pasta do projeto
   - Execute: `npm run dev`
   - Você deve ver: `✓ Ready in Xs` e `○ Local: http://localhost:8080`

2. **Abra o navegador:**
   - Abra Google Chrome, Firefox ou Edge
   - Digite na barra de endereços: `http://localhost:8080`
   - Pressione Enter

3. **Se não funcionar:**
   - Verifique se a porta 8080 está livre
   - Tente: `http://127.0.0.1:8080`
   - Verifique o terminal para mensagens de erro

## 🔧 Comandos úteis:

```bash
# Iniciar servidor
npm run dev

# Parar servidor
Ctrl + C (no terminal)

# Verificar se está rodando
netstat -ano | findstr :8080
```

## 📱 Acesse em qualquer dispositivo na mesma rede:

Se quiser acessar de outro dispositivo (celular, tablet), use:
```
http://SEU_IP_LOCAL:8080
```

Para descobrir seu IP local no Windows:
```bash
ipconfig
```
Procure por "IPv4 Address" (geralmente algo como 192.168.x.x)

