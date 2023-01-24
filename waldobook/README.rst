# Waldobook

## Install

```
poetry install
```

## Run locally

Create a `config.ini` file with the following keys:

```
[MIT_OIDC]
client_id = baa96962-f4a6-4451-9c04-1fcf05c46c12
jwk_public_key = -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApkkVnbFUJXn6Za9zOoJp
    mnlZFDocyOAKQFJli3PuYaMkCS1UI0BT2Mt0NkeFw84hiMhUvVEFpUPT4CytvVcc
    NjSbCEBdm/TMCZj0hbISLtjO/CUi7NbyzINCw2KpXpxFFVt3sJmKidCREXy06mOr
    CS66KE2t8oxnPpEWbma+fXLH13i1YSJMOePJvx3piAQVy76Os9NV8dPlWf5wyjSP
    8OooSc/ZX6tq11IRfQPTKuGyNunLeWDHvY1rwsAtGO3iwcnthP3yMeAmhg69y+sB
    cWn5/GGRbFh1sEk18Yl6d7X5zqSQWB/9a+UaeAplCJmD3tUEWDu9e+1nDdmwK6sX
    twIDAQAB
    -----END PUBLIC KEY-----
```

Update with real values to run in production (although the MIT one is public
and constant)

```
poetry run uvicorn waldobook.main:app --reload
```
