# CUIDADOS A TER COM IOS 
   **Windows/Linux/MacOS (Sistema operativo utilizado para programar em ionic)**
   - Alterar o gitignore para permitir dar push da pasta public relativa a ios ("ios\.gitignore")
    - Correr "ionic cap copy", certos componentes necessários á execução do projeto em MacOS só sao copiados utilizando este comando

**Correr no Xcode**
- Alterar o nome do diretório "node_module" para "node_modules"
 - Correr "pod install" na pasta onde o podfile estiver ("ios\App\Podfile")
	  - Na primeira instalação pode ser necessário instalar CocoaPods ou corrigir algo da instalação do Ruby    

# NOTAS:
  - No caso de darem build de novo ao projeto ("ionic cap build") acrescentem ao manifest em android, sem esta libraria não é possivel fazer a comunicação com os webservices:
     ``` 
     <android:usesCleartextTraffic="true"> 
        <uses-library
	        android:name="org.apache.http.legacy"
            android:required="false" />     
 