<template>
  <div class="faq-wrapper">
    <div class="faq-content">
      <!--
        Markdown is converted via
        https://markdowntohtml.com/
      -->
      <h1 id="faq">FAQ</h1>
      <h2 id="1-metarent-">1. What is MetaRent？</h2>
      <p>
        MetaRent is a decentralized community autonomous NFT platform. Through
        MetaRent, you can rent out idle NFTs and earn income; through MetaRent
        you can rent NFTs at low cost instead of buying them. In the future,
        MetaRent will have more interoperability with Defi, such as mortgage NFT
        on MetaRent for digital currency loans.
      </p>
      <h2 id="2-nft-">2. How to rent NFT?</h2>
      <p>
        Select the NFT that needs to be rented. After confirming the
        information, connect to the metamask wallet extension for authorization
        and payment to complete the renting of the NFT.
      </p>
      <p>Essential information required:</p>
      <p>
        a. Collateral: the renter sets the collateral. During the lease, the
        smart contract keeps the collateral. When the renter returns the NFT,
        the collateral will be returned to the renter through the smart
        contract;
      </p>
      <p>
        b. Rent duration: The number of rented days must be less than or equal
        to the maximum number of rented days. With an early return, it will base
        the number of days rented when renting;
      </p>
      <p>
        c. Rental interest: the cost of renting NFT every day, the renter sets
        the rental interest, and the Rental Cost = Rental Interest * Rental
        Days.
      </p>
      <h2 id="3-nft-">3. How to lend NFT?</h2>
      <p>
        On the "Me" page, select the NFT you plan to rent, confirm the
        information and connect to the metamask wallet extension authorization
        to complete the renting of the NFT.
      </p>
      <p>Essential information required:</p>
      <p>
        a. Collateral, the renter pays the set deposit. If it is too low, the
        renter may not return the NFT. The recommended amount is greater than
        the current value of the NFT market, for example, set to 150% of the NFT
        market value;
      </p>
      <p>b. Daily interest;</p>
      <p>c. The maximum rental days, the maximum days willing to rent.</p>
      <h2 id="4-nft-">4. How to return NFT?</h2>
      <p>
        On the "Me" page, select the NFT waiting to be returned, and connect to
        the metamask wallet to confirm the authorization to return.
      </p>
      <h2 id="5-nft-">5. What happens if the NFT is returned in advance?</h2>
      <p>
        If you return the NFT in advance, the rental days will also be deducted
        based on the number of days confirmed at the time of rental, and the
        deposit at the time of rental will be automatically returned to the
        user’s wallet.
      </p>
      <h2 id="6-nft-">6. What happens if the NFT is returned overdue?</h2>
      <p>
        If the overdue time is less than or equal to 7 days, the interest
        corresponding to the overdue days (calculated by the hour) will be
        deducted from the deposit, and 200% of the corresponding interest amount
        will be charged as a late payment fee. The remaining deposit will be
        automatically returned to the user’s wallet after returning the NFT.
      </p>
      <p>
        If the overdue time is greater than 7 days, the collateral and prepaid
        interest will be transferred to the renter. The ownership of the NFT
        belongs to the renter and there is no need to return the NFT.
      </p>
      <h2 id="7-nft-">7. Will the rented NFT be lost?</h2>
      <p>It may be lost.</p>
      <p>
        During the rent, the ownership of the NFT will be transferred to the
        renter. If the renter will give up the collateral (usually when the
        price of the NFT rises rapidly or the renter forgets to return it), your
        NFT may be lost, but you will get the full collateral and rent interest.
      </p>
      <p>
        To avoid the above situation, it is recommended to set a larger deposit,
        for example, set 150% of the market value of the NFT as the deposit; in
        addition, you can also achieve this goal by setting a shorter rental
        period.
      </p>
      <h2 id="8-">8. When will my deposit be refunded?</h2>
      <p>
        When returning the NFT, if it is not overdue, the collateral will be
        returned normally. If it is overdue, the collateral will be refunded
        after deducting additional interest and overdue penalty.
      </p>
    </div>
  </div>
</template>
<style lang="less">
@import "../assets/global.less";
.faq-wrapper {
  background-color: @body-background-color;
  min-height: 800px;
  max-width: 800px;
  padding-top: 10px;
  padding: 10px 80px 0 80px;
  margin: auto;
  margin-bottom: 50px;
}
.faq-content {
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  h2 {
    padding-left: 20px;
  }
}
</style>
