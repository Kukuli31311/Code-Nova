import { tf, mc, ms } from './types'
import type { Q, Lesson } from './types'

export const LESSONS: Lesson[] = [
  {
    id: 'py1', t: 'Python 1: Temeller',
    slides: [
      {
        h: 'Python nedir?',
        b: '<p><b>Python</b>, bilgisayara ne yapacağını anlatmak için kullandığımız bir programlama dilidir. Arkadaşınla Türkçe konuştuğun gibi, bilgisayarla da Python ile "konuşursun".</p><p>Yazdığın talimatlara <b>kod</b> denir. Bilgisayar kodu yukarıdan aşağıya doğru, her seferinde bir satır okur ve sırayla yapar.</p><p>Python öğrenmesi kolay bir dildir. Oyunlarda, internet sitelerinde ve yapay zekâda bile kullanılır.</p>',
        code: 'print("Merhaba Dünya")\nprint("Ben Python öğreniyorum")',
        hard: 'Bilgisayar kodu sırayla okur. Satırların sırası değişirse sonuç da değişir.',
      },
      {
        h: 'Değişken nedir?',
        b: '<p>Bilgisayar bilgileri aklında tutmak için <b>değişken</b> denen kutular kullanır. Her kutunun bir adı vardır ve içine bir değer koyarız.</p><p>Örneğin <code>yas = 12</code> yazdığında "yas" adlı kutuya 12 koymuş olursun. Sonra bu kutuyu istediğin zaman açıp içindeki değeri kullanabilirsin.</p><p>Aynı kutuya yeni bir değer koyarsan eski değer silinir, yenisi onun yerine geçer.</p>',
        code: 'yas = 12\nprint(yas)   # ekrana 12 yazar\nyas = 13\nprint(yas)   # artık 13 yazar',
        hard: `= işareti "eşittir" demek değil, "kutuya koy" demektir.`,
      },
      {
        h: 'Veri türleri',
        b: '<p>Kutuların içine farklı türde bilgiler koyabiliriz. Python bu türleri birbirinden ayırır:</p><p><code>12</code> tam sayıdır (int). <code>3.5</code> ondalıklı sayıdır (float). <code>"Ada"</code> yazıdır (str). <code>True</code> ve <code>False</code> doğru/yanlış değeridir (bool).</p><p>Yazıları her zaman tırnak içine alırız. Tırnak görürsen Python "bu bir yazı" der, sayı gibi hesaplamaz.</p>',
        code: 'sayi = 12        # int\nondalik = 3.5    # float\nad = "Ada"       # str\nvar_mi = True    # bool\nprint("12" + "3")  # 123 yazar',
        hard: `Tırnak içindeki "12" yazıdır, sayı değildir. "12" + "3" sonucu "123" olur.`,
      },
      {
        h: 'Yazdırma ve isimler',
        b: '<p><code>print()</code> bir değeri ekrana yazdırır. Parantezin içine değişken adını ya da bir yazı koyabilirsin.</p><p>Değişkene verdiğin ad bazı kurallara uymalı: içinde boşluk olamaz, sayıyla başlayamaz. Boşluk yerine alt çizgi (_) kullanırız, örneğin <code>ders_adi</code>.</p><p>İyi bir ad, kutunun içinde ne olduğunu anlatır. <code>p</code> yerine <code>puan</code> yazmak kodunu okumayı kolaylaştırır.</p>',
        code: 'ders_adi = "Python"\npuan = 90\nprint(ders_adi)\nprint(puan)',
        hard: 'Büyük ve küçük harf farklıdır: Yas ile yas iki ayrı değişkendir.',
      },
      {
        h: 'Python ile hesap yapma',
        b: '<p>Python harika bir hesap makinesidir. Şu işaretleri kullanırız: <code>+</code> toplama, <code>-</code> çıkarma, <code>*</code> çarpma, <code>/</code> bölme.</p><p>İki özel işaret daha var: <code>//</code> bölmenin tam kısmını verir, <code>%</code> ise bölmeden <b>kalanı</b> verir. Örneğin 7 bölü 2 işleminde bölüm 3, kalan 1 olur.</p><p>Değişkenlerle de hesap yapabilirsin. Python önce sağ taraftaki hesabı yapar, sonucu kutuya koyar.</p>',
        code: 'print(7 + 3)    # 10\nprint(7 * 3)    # 21\nprint(7 / 2)    # 3.5\nprint(7 // 2)   # 3\nprint(7 % 2)    # 1\nelma = 5\nelma = elma + 2\nprint(elma)     # 7',
        hard: '/ bölmesi her zaman ondalıklı sonuç verir: 10 / 2 sonucu 5.0 olur.',
      },
      {
        h: 'input ile soru sorma',
        b: '<p><code>input()</code> kullanıcıya soru sorar ve yazdığı cevabı alır. Soruyu parantezin içine yazarız. Cevabı bir değişkene koyabiliriz.</p><p>Önemli bir kural: <code>input()</code> cevabı her zaman <b>yazı</b> olarak verir, sayı yazılsa bile. Sayı olarak kullanmak için <code>int()</code> ile çeviririz.</p>',
        code: 'ad = input("Adın ne? ")\nprint("Merhaba", ad)\nyas = int(input("Yaşın kaç? "))\nprint("Seneye", yas + 1, "olacaksın")',
        hard: 'input() her zaman yazı verir. int() kullanmazsan "12" + 1 hata verir.',
      },
    ],
    review: 'Python bir programlama dilidir ve bilgisayar kodu sırayla okur. Değişken bir kutudur, = kutuya değer koyar. Tırnak içindeki her şey yazıdır. + - * / hesap yapar, // tam bölümü, % kalanı verir. input() her zaman yazı verir, sayı için int() kullanılır. Büyük ve küçük harf önemlidir.',
    ex: [
      [
        tf(`Python'da x = 5 yazmak, x değişkenine 5 koyar.`, true, '= işareti atama yapar.'),
        mc('Hangisi bir yazı (str) değeridir?', ['7', '3.5', '"merhaba"', 'True'], 2, 'Tırnak içindeki değer yazıdır.'),
        ms('Hangi iki ad geçerli bir değişken adıdır?', ['ders_adi', '2sayi', 'puan', 'my name'], [0, 2], 'Ad sayıyla başlayamaz ve boşluk içeremez.'),
        mc('print("5" + "2") ne yazdırır?', ['7', '52', 'hata', '5 2'], 1, 'Yazılar yan yana birleşir.'),
        mc('print(10 % 3) ne yazdırır?', ['1', '3', '0', '3.33'], 0, '% kalanı verir. 10 = 3 x 3 + 1, kalan 1 dir.'),
      ],
      [
        mc('Ekrana çıktı veren fonksiyon hangisidir?', ['print()', 'show()', 'say()', 'out()'], 0, 'print() ekrana yazar.'),
        tf('3.5 değeri int türündedir.', false, 'Ondalıklı sayılar float türündedir.'),
        ms('Hangi iki değer sayıdır?', ['10', '"10"', '2.5', '"2.5"'], [0, 2], 'Tırnaksız değerler sayıdır.'),
        mc('a = 4 yazıp sonra a = 9 yazarsan a kaç olur?', ['4', '9', '13', 'hata'], 1, 'Yeni değer eskisinin yerine geçer.'),
        mc('input() ile alınan değer hangi türdedir?', ['int', 'float', 'str', 'bool'], 2, 'input() her zaman yazı (str) verir.'),
      ],
      [
        mc('Hangisi bir ondalık (float) sayıdır?', ['8', '"8.5"', '8.5', 'False'], 2, 'Tırnaksız ve noktalı sayı floattır.'),
        tf('"Ada" bir yazı (str) değeridir.', true, 'Tırnak içinde olduğu için yazıdır.'),
        ms('Hangi iki satır doğru bir atamadır?', ['sayi = 3', '3 = sayi', 'isim = "Can"', '"Can" = isim'], [0, 2], 'Atamada sol tarafta değişken adı olur.'),
        mc('ad = "Ece" yazıp print(ad) dersen ne görürsün?', ['ad', 'Ece', '"Ece"', 'hata'], 1, 'print değeri yazar, tırnaklar görünmez.'),
        mc('print(3 * 4) ne yazdırır?', ['34', '12', '7', 'hata'], 1, '* çarpma yapar. 3 x 4 = 12.'),
      ],
    ],
  },
  {
    id: 'py2', t: 'Python 2: Koşullar',
    slides: [
      {
        h: 'if ile karar ver',
        b: '<p>Programlar da senin gibi karar verebilir. <code>if</code> "eğer" demektir. Bir şeyi kontrol eder, doğruysa altındaki satırları çalıştırır.</p><p>Koşulun sonuna iki nokta (:) koyarız. Çalışacak satırlar ise içeriden, yani girintili başlar. Python hangi satırların <code>if</code> içinde olduğunu girintiden anlar.</p>',
        code: 'yas = 13\nif yas >= 12:\n    print("Ortaokul öğrencisisin")\nprint("Bu satır her zaman çalışır")',
        hard: 'Satır sonundaki iki nokta (:) ve girinti (4 boşluk) şarttır.',
      },
      {
        h: 'else ve elif',
        b: '<p><code>else</code> "değilse" demektir. if koşulu yanlış çıkarsa else bloğu çalışır. else koşul almaz.</p><p>İkiden fazla seçenek varsa <code>elif</code> ("değilse eğer") kullanırız. Python yukarıdan aşağı sırayla bakar, ilk doğru olanı çalıştırır ve gerisini atlar.</p>',
        code: 'puan = 70\nif puan >= 90:\n    print("Pekiyi")\nelif puan >= 50:\n    print("Geçtin")\nelse:\n    print("Tekrar dene")',
        hard: 'Python yukarıdan aşağı bakar, ilk doğru olanı çalıştırır, gerisini atlar.',
      },
      {
        h: 'Karşılaştırma',
        b: '<p>Koşulların içinde değerleri karşılaştırırız: <code>==</code> eşit mi, <code>!=</code> farklı mı, <code>&lt;</code> küçük mü, <code>&gt;</code> büyük mü, <code>&lt;=</code> küçük veya eşit mi, <code>&gt;=</code> büyük veya eşit mi.</p><p>Karşılaştırmanın sonucu hep <code>True</code> ya da <code>False</code> olur. if de bu sonuca bakarak karar verir.</p>',
        code: 'print(5 == 5)   # True\nprint(5 != 3)   # True\nprint(2 > 7)    # False\nprint(4 <= 4)   # True',
        hard: '= atama, == karşılaştırmadır. if x = 5 hata verir.',
      },
      {
        h: 'and, or, not',
        b: '<p>Bazen birden fazla şeyi birlikte kontrol etmek isteriz. Bunun için üç kelime vardır.</p><p><code>and</code> ("ve"): iki koşul da doğruysa sonuç doğru olur. <code>or</code> ("veya"): koşullardan biri doğruysa yeter. <code>not</code> ("değil"): doğruyu yanlış, yanlışı doğru yapar.</p><p>Örneğin bir parka girmek için hem yaşının 10 dan büyük olması hem de biletinin olması gerekebilir. Burada <code>and</code> kullanırız.</p>',
        code: 'yas = 13\nbilet = True\nif yas > 10 and bilet:\n    print("İçeri gir")\nprint(5 > 3 or 2 > 9)   # True\nprint(not True)         # False',
        hard: 'and da ikisi de doğru olmalı, or da biri yeterli. Karıştırma!',
      },
    ],
    review: 'if, elif, else sırayla bakılır ve ilk doğru olan çalışır. İki nokta ve girinti unutulmaz. == karşılaştırır, = değer atar. and ikisi de doğruyken, or en az biri doğruyken True verir.',
    ex: [
      [
        tf('== işareti iki değeri karşılaştırır.', true, '== "eşit mi?" sorusudur.'),
        mc('Hangisi doğru yazılmış bir koşul satırıdır?', ['if x > 3', 'if x > 3:', 'if (x > 3)', 'if x > 3;'], 1, 'Satır iki nokta ile bitmelidir.'),
        ms('Hangi ikisi karşılaştırma işaretidir?', ['==', '=', '!=', '->'], [0, 2], '== ve != karşılaştırır, = atama yapar.'),
        mc('x = 10 iken: if x > 20 ise A, elif x > 5 ise B, else C yazdırılıyor. Çıktı ne olur?', ['A', 'B', 'C', 'Hiçbiri'], 1, 'x > 20 yanlış, x > 5 doğru. İlk doğru olan çalışır.'),
        mc('x = 6 iken x > 3 and x < 5 sonucu nedir?', ['True', 'False', '6', 'hata'], 1, 'and için ikisi de doğru olmalı. x < 5 yanlış olduğu için sonuç False.'),
      ],
      [
        mc('Koşul yanlışsa hangi blok çalışır?', ['if', 'else', 'print', 'def'], 1, 'else yanlış durumu karşılar.'),
        tf('if x = 5: doğru yazımdır.', false, 'Karşılaştırma için == kullanılır.'),
        ms('Girintiyle ilgili hangi iki bilgi doğrudur?', ['if içindeki satırlar girintili yazılır', 'Girinti süstür, zorunlu değildir', 'Genelde 4 boşluk kullanılır', 'Girinti sadece print için gerekir'], [0, 2], 'Python bloğu girintiden anlar.'),
        mc('5 != 3 sonucu nedir?', ['True', 'False', '5', 'hata'], 0, '5 ile 3 farklıdır.'),
        tf('or kullanırsan koşullardan biri doğru olduğunda sonuç True olur.', true, 'or için en az birinin doğru olması yeter.'),
      ],
      [
        mc('x = 3 iken if x == 3: print("A") ne yazdırır?', ['A', 'Hiçbir şey', 'hata', '3'], 0, 'x 3 e eşit, koşul doğru.'),
        tf('Koşul yanlışsa if içindeki girintili satırlar atlanır.', true, 'Sadece doğru koşulda çalışırlar.'),
        ms('Hangi iki satır doğru yazılmıştır?', ['if puan >= 50:', 'if puan >= 50', 'else:', 'else puan < 50:'], [0, 2], 'if koşul ve iki nokta ister. else koşul almaz ama iki nokta ister.'),
        mc('yas = 10 iken: yas >= 12 ise "Büyük", değilse "Küçük" yazdırılıyor. Çıktı ne olur?', ['Büyük', 'Küçük', '10', 'hata'], 1, '10 >= 12 yanlış, else çalışır.'),
        mc('x = 2 iken x == 2 or x == 9 sonucu nedir?', ['True', 'False', '2', 'hata'], 0, 'Birincisi doğru. or için bu yeter.'),
      ],
    ],
  },
  {
    id: 'py3', t: 'Python 3: Döngüler',
    slides: [
      {
        h: 'for ile tekrar',
        b: '<p>Aynı işi 100 kez yapmak istesen 100 satır yazmazsın. <b>Döngü</b> bir işi tekrar tekrar yapar.</p><p><code>for i in range(3):</code> altındaki girintili satırları 3 kez çalıştırır. i her turda yeni bir sayı alır: önce 0, sonra 1, sonra 2.</p>',
        code: 'for i in range(3):\n    print("Tur", i)\n# Tur 0\n# Tur 1\n# Tur 2',
        hard: 'range(3) sayıları 0, 1, 2 verir. 3 dahil değildir.',
      },
      {
        h: 'range ile sayı üretme',
        b: '<p><code>range()</code> üç şekilde yazılabilir. <code>range(5)</code> 0 dan başlar ve 5 e kadar gider, ama 5 dahil değildir.</p><p><code>range(2, 6)</code> başlangıcı ve bitişi belirler: 2, 3, 4, 5. <code>range(0, 10, 2)</code> ise üçüncü sayıyla <b>adımı</b> belirler: ikişer ikişer sayar.</p><p>Bitiş sayısı hiçbir zaman dahil olmaz. Bunu aklında tut.</p>',
        code: 'for i in range(2, 6):\n    print(i)        # 2 3 4 5\nfor j in range(0, 10, 2):\n    print(j)        # 0 2 4 6 8',
        hard: 'Bitiş sayısı dahil değildir: range(2, 6) içinde 6 yoktur.',
      },
      {
        h: 'while ile tekrar',
        b: '<p><code>while</code> "...olduğu sürece" demektir. Koşul doğru olduğu sürece altındaki satırlar tekrar tekrar çalışır. Her turdan önce koşul yeniden kontrol edilir.</p><p>Koşulun bir gün yanlış olması için döngünün içinde sayacı değiştirmen gerekir. Yoksa döngü sonsuza kadar sürer.</p>',
        code: 'x = 0\nwhile x < 3:\n    print(x)\n    x = x + 1   # bunu unutma!',
        hard: 'x değiştirilmezse döngü hiç bitmez. Buna sonsuz döngü denir.',
      },
      {
        h: 'Döngüde toplama',
        b: '<p>Döngüler sayıları toplamak için çok kullanışlıdır. Önce <code>toplam = 0</code> diye boş bir kutu hazırlarız. Sonra her turda kutuya yeni sayıyı ekleriz.</p><p><code>toplam = toplam + i</code> şunu söyler: "kutudaki eski değere i yi ekle ve sonucu yine kutuya koy."</p>',
        code: 'toplam = 0\nfor i in range(4):\n    toplam = toplam + i\nprint(toplam)   # 0+1+2+3 = 6',
        hard: 'toplam = 0 satırını döngüden önce yazmayı unutma.',
      },
    ],
    review: 'range(n) 0 ile n-1 arasını verir. range(a, b) a dan başlar b ye kadar gider ama b yoktur. range(a, b, adım) adımla sayar. while döngüsünde sayaç değişmezse döngü sonsuza gider. Toplama başlamadan önce toplam = 0 yazılır.',
    ex: [
      [
        tf('range(3) değerleri 0, 1 ve 2 dir.', true, 'range(3) 3 sayı üretir ve 0 dan başlar.'),
        mc('for i in range(4): print(i) kaç satır yazdırır?', ['3', '4', '5', '1'], 1, 'range(4) dört sayı verir: 0, 1, 2, 3.'),
        ms('Hangi ikisi bir döngü yapısıdır?', ['for', 'if', 'while', 'print'], [0, 2], 'for ve while tekrar için kullanılır.'),
        mc('Sonsuz döngüyü ne önler?', ['Koşulu bir ara yanlış yapmak', 'Daha çok print yazmak', 'Büyük harf kullanmak', 'Yorum satırı eklemek'], 0, 'Koşul bir ara yanlış olunca döngü durur.'),
        tf('toplam = 0 satırı döngüden önce yazılır.', true, 'Toplam başlangıç değeri olmadan hesaplanamaz.'),
      ],
      [
        mc('range(1, 4) hangi sayıları verir?', ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', '2, 3, 4'], 0, 'Başlangıç dahil, bitiş dahil değildir.'),
        tf('while döngüsü koşul yanlış olunca durur.', true, 'Koşul her turda kontrol edilir.'),
        ms('Hangi ikisi doğrudur?', ['range(5) 5 sayı üretir', 'range(5) 5 i de içerir', 'for döngüsü tekrar için kullanılır', 'while da sayaç değişmezse döngü biter'], [0, 2], 'range(5): 0, 1, 2, 3, 4.'),
        mc('toplam = 0 iken for i in range(3): toplam = toplam + i çalışırsa toplam kaç olur?', ['3', '6', '0', '2'], 0, '0 + 1 + 2 = 3.'),
        tf('while x < 3: print(x) döngüsünde x artmıyorsa bir kez yazıp durur.', false, 'x değişmediği için döngü sonsuza kadar sürer.'),
      ],
      [
        mc('for i in range(2): print("Merhaba") kaç kez Merhaba yazdırır?', ['1', '2', '3', '0'], 1, 'range(2) iki tur döner.'),
        tf('range(5) içinde 5 sayısı da bulunur.', false, 'range(5): 0, 1, 2, 3, 4.'),
        ms('Hangi iki bilgi doğrudur?', ['while koşul doğruyken tekrar eder', 'for döngüsünde i her turda yeni değer alır', 'while döngüsü hiç durmaz', 'range(3) 1, 2, 3 verir'], [0, 1], 'while durabilir, range(3) ise 0, 1, 2 verir.'),
        mc('sayac = 0 iken while sayac < 3: sayac = sayac + 1 kaç tur döner?', ['2', '3', '4', 'sonsuz'], 1, 'sayac 0, 1, 2 iken döner, 3 olunca durur.'),
        mc('range(0, 10, 2) hangi sayıları verir?', ['0, 2, 4, 6, 8', '2, 4, 6, 8, 10', '0, 2, 4, 6, 8, 10', '1, 3, 5, 7, 9'], 0, 'Üçüncü sayı adımdır. 0 dan başlar, ikişer artar, 10 dahil değildir.'),
      ],
    ],
  },
  {
    id: 'py4', t: 'Python 4: Listeler',
    slides: [
      {
        h: 'Liste nedir?',
        b: '<p>Şimdiye kadar her kutuya tek bir değer koyduk. Peki 10 arkadaşının adını tutmak istesen? 10 ayrı kutu yerine tek bir <b>liste</b> kullanırız.</p><p>Liste, içinde birçok değer taşıyan bir kutudur. Köşeli parantez <code>[ ]</code> ile yazılır ve elemanlar virgülle ayrılır. <code>len()</code> listede kaç eleman olduğunu söyler.</p>',
        code: 'meyveler = ["elma", "armut", "kiraz"]\nprint(meyveler)        # bütün listeyi yazar\nprint(len(meyveler))   # 3',
        hard: 'Elemanları virgülle ayırmayı unutma: [1 2 3] hata verir, [1, 2, 3] doğrudur.',
      },
      {
        h: 'Sıra numarası (indeks)',
        b: '<p>Listedeki her elemanın bir <b>sıra numarası</b> vardır. Bu numara <b>0 dan</b> başlar, 1 den değil. İlk eleman 0, ikinci eleman 1, üçüncü eleman 2 numaradır.</p><p>Bir elemana ulaşmak için listenin adının yanına köşeli parantez içinde numarasını yazarız. <code>-1</code> ise listenin son elemanıdır.</p>',
        code: 'meyveler = ["elma", "armut", "kiraz"]\nprint(meyveler[0])    # elma\nprint(meyveler[1])    # armut\nprint(meyveler[-1])   # kiraz',
        hard: 'Saymaya 0 dan başlarız. 3 elemanlı listede son numara 2 dir.',
      },
      {
        h: 'Ekleme, değiştirme, gezme',
        b: '<p>Listeye yeni eleman eklemek için <code>append()</code> kullanırız. Eleman listenin <b>sonuna</b> eklenir. Bir elemanı değiştirmek için sıra numarasına yeni değer atarız.</p><p>Listenin her elemanını sırayla gezmek için <code>for</code> döngüsü kullanırız. Her turda <code>m</code> listedeki bir sonraki eleman olur.</p>',
        code: 'meyveler = ["elma", "armut"]\nmeyveler.append("muz")     # sona ekler\nmeyveler[0] = "çilek"      # ilkini değiştirir\nfor m in meyveler:\n    print(m)\n# çilek\n# armut\n# muz',
        hard: 'for m in meyveler: satırında m sıra numarası değil, elemanın kendisidir.',
      },
    ],
    review: 'Liste köşeli parantezle yazılır, elemanlar virgülle ayrılır. Sıra numarası 0 dan başlar, [-1] son elemandır. len() eleman sayısını verir. append() sona ekler. for ile liste elemanları sırayla gezilir.',
    ex: [
      [
        tf('Listeler köşeli parantezle yazılır.', true, 'Örnek: [1, 2, 3].'),
        mc('sayilar = [10, 20, 30] ise sayilar[0] kaçtır?', ['10', '20', '30', '0'], 0, 'İlk elemanın sıra numarası 0 dır.'),
        ms('Hangi iki satır doğru bir listedir?', ['[1, 2, 3]', '1, 2, 3]', '["a", "b"]', '[1 2 3]'], [0, 2], 'Liste köşeli parantez içindedir ve elemanlar virgülle ayrılır.'),
        mc('len(["a", "b", "c", "d"]) ne verir?', ['3', '4', '5', 'hata'], 1, 'Listede 4 eleman var.'),
        tf('Listenin ilk elemanının sıra numarası 1 dir.', false, 'Sıra numarası 0 dan başlar.'),
      ],
      [
        mc('l = ["a", "b", "c"] ise l[2] nedir?', ['a', 'b', 'c', 'hata'], 2, 'l[0]=a, l[1]=b, l[2]=c.'),
        tf('append() listenin sonuna eleman ekler.', true, 'Yeni eleman en sona eklenir.'),
        ms('Hangi iki bilgi doğrudur?', ['Liste birden fazla değer tutabilir', 'Sıra numarası 1 den başlar', 'len() listenin eleman sayısını verir', 'append() listenin başına ekler'], [0, 2], 'Sıra numarası 0 dan başlar, append() sona ekler.'),
        mc('x = [5, 6] yazıp x.append(7) çalıştırırsan len(x) kaç olur?', ['2', '3', '4', '7'], 1, 'Liste [5, 6, 7] olur, 3 eleman var.'),
        tf('l[-1] listenin son elemanıdır.', true, '-1 sondan birinci demektir.'),
      ],
      [
        mc('sayilar = [4, 8, 12] iken sayilar[1] = 9 yazılırsa liste ne olur?', ['[4, 9, 12]', '[9, 8, 12]', '[4, 8, 9]', '[4, 8, 12, 9]'], 0, 'Sıra numarası 1 olan ikinci eleman değişir.'),
        tf('for x in liste: listenin her elemanını sırayla gezer.', true, 'x her turda bir sonraki eleman olur.'),
        ms('a bir liste ise hangi iki satır doğru yazılmıştır?', ['a.append(3)', 'a[0] = 3', 'a(3)', 'a.add 3'], [0, 1], 'append() sona ekler, a[0] = 3 ilk elemanı değiştirir.'),
        mc('for m in ["a", "b"]: print(m) kaç satır yazdırır?', ['1', '2', '3', '0'], 1, 'Listede 2 eleman var, 2 tur döner.'),
        tf('[10, 20, 30] listesinde 30 un sıra numarası 3 tür.', false, 'Sıra numarası 0 dan başladığı için 30 un numarası 2 dir.'),
      ],
    ],
  },
  {
    id: 'py5', t: 'Python 5: Fonksiyonlar',
    slides: [
      {
        h: 'Fonksiyon nedir?',
        b: '<p>Aynı kodu tekrar tekrar yazmak yorucu olur. <b>Fonksiyon</b>, bir kez yazıp istediğin kadar kullanabildiğin küçük bir makine ya da bir tarif gibidir. Aslında <code>print()</code> ve <code>len()</code> da birer fonksiyondur!</p><p>Kendi fonksiyonumuzu <code>def</code> ile tanımlarız. Satırın sonuna iki nokta koyarız ve fonksiyonun içindeki satırları girintili yazarız.</p><p>Fonksiyonu çalıştırmak için adını ve parantezi yazarız. Buna fonksiyonu <b>çağırmak</b> denir.</p>',
        code: 'def selam():\n    print("Merhaba!")\n    print("Nasılsın?")\n\nselam()\nselam()',
        hard: 'def sadece fonksiyonu hazırlar, çalıştırmaz. Çalışması için selam() diye çağırmalısın.',
      },
      {
        h: 'Parametre ile bilgi ver',
        b: '<p>Fonksiyonlara dışarıdan bilgi de verebiliriz. Bunun için parantezin içine bir isim yazarız, buna <b>parametre</b> denir. Parametre, fonksiyonun içinde kullanılan geçici bir kutudur.</p><p>Fonksiyonu çağırırken parantezin içine gerçek değeri yazarız. Her çağırışta farklı bir değer verebilirsin. Birden fazla parametre de olabilir, aralarına virgül koyarız.</p>',
        code: 'def selam(ad):\n    print("Merhaba", ad)\n\nselam("Ada")   # Merhaba Ada\nselam("Can")   # Merhaba Can',
        hard: 'Parametre sayısı ile çağırırken verdiğin değer sayısı aynı olmalıdır.',
      },
      {
        h: 'return ile sonuç al',
        b: '<p>Bazen fonksiyonun bir sonuç hesaplayıp bize geri vermesini isteriz. Bunun için <code>return</code> kullanırız. Dönen sonucu bir değişkene koyabiliriz.</p><p><code>print()</code> değeri sadece ekrana yazar. <code>return</code> ise değeri programa geri verir, böylece onunla başka işler yapabiliriz. Fonksiyon <code>return</code> satırına gelince biter.</p>',
        code: 'def topla(a, b):\n    return a + b\n\nsonuc = topla(3, 4)\nprint(sonuc)         # 7\nprint(topla(1, 2))   # 3',
        hard: 'return satırından sonra yazdığın satırlar çalışmaz, fonksiyon orada biter.',
      },
    ],
    review: 'Fonksiyon def ile tanımlanır, iki nokta ve girinti ister. Tanımlamak çalıştırmaz, adını parantezle yazarak çağırırız. Parametre fonksiyona bilgi taşır. return sonucu geri verir, print ise sadece ekrana yazar.',
    ex: [
      [
        tf('Fonksiyon def kelimesiyle tanımlanır.', true, 'def "define", yani tanımla demektir.'),
        mc('Tanımlanmış bir fonksiyonu çalıştırmak için ne yaparız?', ['Adını parantezle yazarız: selam()', 'Sadece def yazarız', 'import yazarız', 'Hiçbir şey yapmayız'], 0, 'Fonksiyonu çağırmak için adının yanına parantez koyarız.'),
        ms('Hangi iki satır doğru bir fonksiyon tanımıdır?', ['def selam():', 'def selam()', 'selam def():', 'def topla(a, b):'], [0, 3], 'def, ad, parantez ve iki nokta gerekir.'),
        mc('def f(x): return x * 2 yazılırsa print(f(5)) ne yazdırır?', ['5', '10', '25', 'hata'], 1, '5 * 2 = 10.'),
        tf('def yazmak fonksiyonu hemen çalıştırır.', false, 'def sadece tanımlar. Çalışması için çağırmak gerekir.'),
      ],
      [
        mc('def topla(a, b): return a + b yazılırsa topla(2, 3) sonucu nedir?', ['23', '5', '6', 'hata'], 1, '2 + 3 = 5.'),
        tf('Fonksiyona bilgi vermek için parametre kullanılır.', true, 'Parametre fonksiyonun aldığı bilgidir.'),
        ms('Hangi iki bilgi doğrudur?', ['Fonksiyon bir kez yazılır, birçok kez çağrılır', 'Fonksiyonun içindeki satırlar girintisiz yazılır', 'return sonucu geri verir', 'Fonksiyonda parametre olamaz'], [0, 2], 'İçerideki satırlar girintilidir ve parametre kullanılabilir.'),
        mc('def kare(n): return n * n yazılırsa kare(4) kaçtır?', ['8', '16', '44', 'hata'], 1, '4 * 4 = 16.'),
        tf('return satırından sonra yazılan satırlar o çağrıda çalışmaz.', true, 'return fonksiyonu bitirir.'),
      ],
      [
        mc('def selam(ad): print("Merhaba", ad) yazılırsa selam("Ece") ne yazdırır?', ['Merhaba ad', 'Merhaba Ece', 'Ece', 'hata'], 1, 'ad parametresi "Ece" değerini alır.'),
        tf('Aynı fonksiyon farklı değerlerle birden fazla kez çağrılabilir.', true, 'Fonksiyonun amacı budur.'),
        ms('Hangi iki satır bir fonksiyonu çağırır?', ['topla(1, 2)', 'def topla(1, 2)', 'selam()', 'def selam():'], [0, 2], 'def tanımlar, ad ve parantez ise çağırır.'),
        mc('Bir fonksiyon "A" yazdırıyor ve onu 2 kez çağırıyorsun. Kaç tane A görürsün?', ['0', '1', '2', '3'], 2, 'Her çağrıda bir kez çalışır.'),
        tf('return ile print aynı işi yapar.', false, 'print ekrana yazar, return değeri geri verir.'),
      ],
    ],
  },
]

export const FINAL: Q[] = [
  mc('Hangisi yazı değeridir?', ['12', '"12"', '12.0', 'True'], 1, 'Tırnak içindeki değer yazıdır.'),
  mc('liste = [5, 10, 15] iken liste[1] kaçtır?', ['5', '10', '15', '1'], 1, 'Sıra numarası 0 dan başlar: liste[0]=5, liste[1]=10.'),
  ms('Hangi iki ad geçerli bir değişken adıdır?', ['sayi1', '1sayi', 'ad_soyad', 'ad soyad'], [0, 2], 'Sayıyla başlayamaz, boşluk içeremez.'),
  mc('x = 7 iken: x > 10 ise A, x > 5 ise B, değilse C yazdırılıyor. Çıktı ne olur?', ['A', 'B', 'C', 'Hiçbiri'], 1, 'İlk doğru koşul çalışır.'),
  mc('def kare(n): return n * n yazıldıktan sonra kare(3) ne verir?', ['6', '9', '33', 'hata'], 1, '3 * 3 = 9.'),
  ms('Hangi ikisi karşılaştırma işaretidir?', ['==', '=', '>=', '<-'], [0, 2], '= atama yapar, karşılaştırmaz.'),
  mc('range(3) kaç tur döndürür?', ['2', '3', '4', '0'], 1, '0, 1, 2 olmak üzere 3 tur.'),
  tf('while döngüsünde sayaç artmazsa döngü sonsuz olabilir.', true, 'Koşul hiç yanlış olmaz.'),
  mc('toplam = 0 iken for i in range(4): toplam = toplam + i çalışırsa toplam kaç olur?', ['4', '6', '10', '3'], 1, '0 + 1 + 2 + 3 = 6.'),
  ms('Hangi iki bilgi doğrudur?', ['print() ekrana yazar', 'Python da girinti önemsizdir', 'append() listenin sonuna ekler', 'input() sayı verir'], [0, 2], 'Girinti önemlidir, input() yazı verir.'),
]
