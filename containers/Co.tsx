import { Grid, Typography, Container, Button, Link } from '@mui/material'
import Logo from '../components/Logo'
import OrderedList from '../components/OrderedList'
import Image from '../components/Image'

const Co = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" textAlign="center" color="primary" gutterBottom>
        C<Logo size="uppercase" />?
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <OrderedList>
            <li>
              Tradiční Larpový tábor pro účastníky ze všech koutků ČR se letos
              přesouvá na novou základnu. Tábor proběhne na Křekově u Valašských
              Klobouk
              <Button
                variant="text"
                size="large"
                href="https://www.facebook.com/SMRzakladna/"
              >
                Facebookové stránky základny
              </Button>
              <Button
                variant="text"
                size="large"
                href="https://mapy.cz/s/gudulevape"
              >
                Mapy.cz
              </Button>
            </li>
            <li>
              Letos oproti minulým ročníkům jsme si pro Vás připravili vícedenní
              LARP, na který od Vás potřebujeme, abyste si připrvili vlastní
              postavy. S postavama Vám pomůže Vydra, můžete ho kontaktovat na
              FB, Discordu nebo na emailu{' '}
              <Link href="mailto:vydra@malenovska.cz">vydra@malenovska.cz</Link>
              . Abyste vědeli, co Vás čeká, zde je počáteční info, kde se bude
              LARP odehrávat
            </li>
            <li>
              Protože bude tábor zaměřený především na hraní LARPu, je třeba s
              sebou mít kostým, který odpovídá vaší postavě. Také vás poprosíme
              aby jste si pro letošní rok zajistili vlastní zbraně.
            </li>
            <li>
              Co s sebou?
              <br />
              Kostým na Vaši postavu
              <br />
              Spacák
              <br />
              Karimatku
              <br />
              Baterku nebo jinou svítilnu (doporučujeme čelovku)
              <br />
            </li>
            <li>Termín: 13.8.2022 - 20.8.2022</li>
            <li>Cena: 4300 Kč</li>
          </OrderedList>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Image src="/smr_zakladna.jpg" />
        </Grid>
      </Grid>
      <Typography variant="body1" gutterBottom>
        Letošní tábor se bude konat v trochu jiném středisku než jste zvyklí.
        Základna se nachází u lesa u obce Křekov, v malebné přírodě v srdci
        Valašska. Na základně je tekoucí pitná voda, sprcha, splachovací WC.
        Ubytování je ve stanech s podsadou a postelemi, nicméně je nutné si vzít
        dobrý spacák, na konci srpna už může být v noci zima. Doporučujeme si
        taky vzít karimatku pro případné spaní venku. Na základně je elektřina
        pouze v organizátorské chatě, ke které účastníci mají přístup výjimečně.
        Samozřejmě bude možnost nabít telefony na konci tábora, abyste se mohli
        domluvit na odjezdu, ale z naší zkušenosti telefony na táboře jsou spíše
        na škodu. V průběhu tábora bude možné kontaktovat organizátory, stejně
        tak účastníci budou mít možnost kontaktovat své rodiče přes
        organizátory. Ale není poetičtější napsat dopis?
      </Typography>
      <Typography variant="body1">
        Děj našeho larpu pokračuje v malém, ale zdaleka ne bezvýznamném
        městečku Mrsklesy. V příběhu budeme pokračovat tam, kde jsme minulý ročník skončili,
        a to procesem se zloději. 
        
        Většina Vašich postav tudíž bude místních, můžete pokračovat v postavě z minula nebo si vytvořit
        postavu novou. Letos budete mít přiřazenou i funkci ve městě, kterou si vyberete při registraci.
        Na výběr máte:
         <ul>
    <li>Alchymista</li>
    <li>Kovář</li>
    <li>Kněz/správce chrámu</li>
    <li>Hlídka</li>
    <li>Bordelmamá</li>
    <li>Bard</li>
    <li>Mágové (lóže)</li>
    <li>Farmář</li>
    <li>Felčar</li>
    <li>Lovec</li>
  </ul>

        
        
      </Typography>
    </Container>
  )
}

export default Co
