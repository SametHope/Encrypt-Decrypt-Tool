# Encrypt / Decrypt Tool
This is a fully offline tool intended for encrypting and decrypting data from latest version of [meld-cp](https://github.com/meld-cp)'s [Obsidian Encrypt Plugin](https://github.com/meld-cp/obsidian-encrypt) (aka Meld Encrypt) with or without having the plugin or [Obsidian](https://obsidian.md/) installed. It can also be used independently from these technologies to encrypt and decrypt data on its own.  

The original plugin has multiple algorithms to handle data with support for obsolete methods and versions.  
This tool on the other hand _is hardcoded to work with data labeled as_ `version 2.0` which uses PBKDF2 with SHA-512 and 210,000 iterations to derive a 256-bit AES-GCM key, generating a random 16-byte salt and 16-byte IV for each operation.

I wrote this on a evening after wondering and worrying about how would I access my encrypted data without access to both Obsidian and the plugin. 
You can easily store a copy of this repository (or just the [src](src)) in your vault since it’s super small and just relies on a web browser to be present. Without some visual dependencies like [Bootstrap](https://getbootstrap.com/) and [Toastify JS](https://apvarun.github.io/toastify-js/#), the core tool can go as small as just 20 kilobytes since it is just plain text waiting to be interpreted by browsers.

## Installation / Removal
This is a self-contained HTML, CSS, JS bundle. There are no special procedures required.

### Installation Steps:
1. Clone or download the repository (or just the [src](src) directory with its content)
2. Done

### Removal Steps:
1. Delete the directory you have downloaded previously
2. Done

## Usage
Locate the [index.html](src/index.html) file inside the [src](src) directory and open it with your preferred web browser.  
You should see a screen similiar to the one in the image below.  

![Screenshot 2024-11-11 202845](https://github.com/user-attachments/assets/2bb713fa-4ea5-4ffa-94df-79135d6bcab0)

### Encrypt Data
1. Input the data you want to encrypt
2. Input the password you want to use to encrypt the data with
3. Click to the Encrypt button
4. You should see the encrypted output on the output box below as well as a toast message on top right of your screen indicating success

![Screenshot 2024-11-11 203550](https://github.com/user-attachments/assets/18cc0572-bfc9-4f77-bafa-2b72dee5a029)

### Decrypt Data
1. Input the data you want to decrypt
2. Input the password you want to use to decrypt the data with, this has to match with the password used when data was being encrypted for the first time
3. Click to the Decrypt button
4. You should see the decrypted output on the output box below as well as a toast message on top right of your screen indicating success (I've used the Switch Input/Output Content button to quickly put my freshly encoded data as input with the same password)

![Screenshot 2024-11-11 204217](https://github.com/user-attachments/assets/244accd3-d6ce-4ae4-89e2-264bcb820e5f)

## Extra
If you are encrypting whole notes instead of using inline encryption with [Meld Encrypt](https://github.com/meld-cp/obsidian-encrypt), you can get the encoded data by simply opening `.mdenc` files with a text editor as they are basically json files with a different file extension.  
You can also see the version of the encoding here. If it is something other than `2.0`, this tool will most likely fail. You can let me know if there is a demand for supporting below `2.0`

![Screenshot 2024-11-11 205022](https://github.com/user-attachments/assets/dacd1edd-03fd-497e-9da8-bc42e898933f)

![Screenshot 2024-11-11 205420](https://github.com/user-attachments/assets/88c6959b-a40b-4ed5-b06c-b601969def86)
