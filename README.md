# ASYNCSTORAGE

- AsyncStorage React native de kalıcı veri saklamak için kullanılan yerel depolama çözümüdür.
- Key - value (anahtar-değer) yapısınd açalışır
- Asenkron olarak veri saklar.

# En önemli noktalar

- 1. Veriler string olarak saklanır.
     -- eğer obje saklayacaksan JSON.stringfy() kullnamlaısın, geri alırken JSON.parse() ile çevirmelisin.

- 2. Asenkron çalışır.
     -- await kullanmalıyız veya then() ile işlem yap.

- 3.  Kalıcı veri saklama
      -- Uygulama kapansa bile veriler silinmez.

## özet

- küçük veriler için uygundur ama önemli.(JWT, kullanıcı ayarları, token)

- asenkron çalıştığı için await veya then()

- obje veya dizileri saklamak için JSON.stringfy() kullan.

- güncelleme yaparken önce veriyi çekip düzenle ve tekrar kaydet

- - const user=JSON.parse(await AsyncStorage.getItem("user"))
    user.age=25
    await AsyncStorage.setItem("user", JSON.stringy(user))

- kalıcıdır, ama elle clear() temizlenebilir.

- - await AsyncStorage.clear()

- veri silmek için
- await AsyncStorage.removeItem("user")
