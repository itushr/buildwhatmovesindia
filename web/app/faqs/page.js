'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { 
  SearchIcon, 
  ChevronDownIcon, 
  ArrowRightIcon,
  InformationCircleIcon
} from '../../components/Icons';
import { 
  HelpCircle, 
  Coins, 
  Clock, 
  Scale, 
  PhoneCall, 
  Building2,
  FileText,
  ShieldCheck
} from 'lucide-react';

const FAQ_CATEGORIES = [
  { id: 'all', labelEn: 'All FAQs', labelHi: 'सभी प्रश्न', icon: HelpCircle },
  { id: 'general', labelEn: 'General & Jurisdiction', labelHi: 'सामान्य एवं क्षेत्राधिकार', icon: Building2 },
  { id: 'filing', labelEn: 'Filing & Drafting', labelHi: 'आवेदन एवं प्रारूपण', icon: FileText },
  { id: 'fees', labelEn: 'Fees & Payments', labelHi: 'शुल्क एवं भुगतान', icon: Coins },
  { id: 'appeals', labelEn: 'First Appeals', labelHi: 'प्रथम अपील', icon: Scale },
  { id: 'status', labelEn: 'Status & Tracking', labelHi: 'ट्रैकिंग एवं स्थिति', icon: Clock },
  { id: 'tech', labelEn: 'Technical & Security', labelHi: 'तकनीकी एवं सुरक्षा', icon: ShieldCheck },
];

export const FAQ_DATA = [
  {
    id: 1,
    category: 'general',
    questionEn: 'To which Public Authority can I file a request through this portal?',
    questionHi: 'मैं इस पोर्टल के माध्यम से किस लोक प्राधिकरण (Public Authority) में आवेदन दायर कर सकता हूँ?',
    answerEn: 'An applicant who desires to obtain information under the RTI Act, 2005 can make a request through this RTI Online Portal to the Central Ministries/Departments and other Central Public Authorities mentioned in ONLINE RTI request form.',
    answerHi: 'RTI अधिनियम, 2005 के तहत जानकारी प्राप्त करने के इच्छुक आवेदक इस RTI ऑनलाइन पोर्टल के माध्यम से ऑनलाइन RTI अनुरोध फॉर्म में उल्लिखित केंद्रीय मंत्रालयों/विभागों और अन्य केंद्रीय लोक प्राधिकरणों को अनुरोध प्रस्तुत कर सकते हैं।',
    relatedLink: { href: '/submit-request', labelEn: 'Submit RTI Request', labelHi: 'RTI आवेदन दर्ज करें' }
  },
  {
    id: 2,
    category: 'filing',
    questionEn: 'How do I write my application for seeking the information as per RTI Act 2005?',
    questionHi: 'RTI अधिनियम 2005 के अनुसार जानकारी प्राप्त करने के लिए मैं अपना आवेदन कैसे लिखूँ?',
    answerEn: `The text of the application may be written in the prescribed column of the RTI request form. At present, the text of the application is confined up to 3000 characters only.

In case, the text of an application contains more than 3000 characters, it can be uploaded as a PDF attachment in the "Supporting Document" column of the form.`,
    answerHi: `आवेदन का विवरण RTI अनुरोध फॉर्म के निर्धारित कॉलम में लिखा जा सकता है। वर्तमान में, आवेदन का पाठ केवल 3000 वर्णों (Characters) तक ही सीमित है।

यदि किसी आवेदन का पाठ 3000 वर्णों से अधिक है, तो इसे फॉर्म के "Supporting Document" (सहायक दस्तावेज) कॉलम में PDF अनुलग्नक (Attachment) के रूप में अपलोड किया जा सकता है।`
  },
  {
    id: 3,
    category: 'fees',
    questionEn: 'How do I make the payment for RTI fee?',
    questionHi: 'मैं RTI शुल्क का भुगतान कैसे करूँ?',
    answerEn: `After filling the first page of the RTI request form, a non-BPL applicant has to click on "Make Payment" button for payment of the prescribed RTI fee.

The applicant can pay the prescribed RTI fee through the following modes:
(i) Internet banking through SBI payment gateway and its associated banks.
(ii) Using ATM-cum-Debit card of State Bank of India.
(iii) Credit/Debit card of Master/Visa.
(iv) UPI

It may be noted that no RTI fee is required to be paid by a citizen who is below poverty line, as per RTI Rules, 2012. However, the BPL applicant must attach a copy of the certificate issued by the appropriate government in this regard, along with the application.`,
    answerHi: `RTI अनुरोध फॉर्म का पहला पृष्ठ भरने के बाद, गैर-BPL आवेदक को निर्धारित RTI शुल्क के भुगतान के लिए "Make Payment" बटन पर क्लिक करना होगा।

आवेदक निम्नलिखित माध्यमों से निर्धारित RTI शुल्क का भुगतान कर सकता है:
(i) SBI पेमेंट गेटवे और उसके सहयोगी बैंकों के माध्यम से इंटरनेट बैंकिंग।
(ii) भारतीय स्टेट बैंक के ATM-कम-डेबिट कार्ड का उपयोग करके।
(iii) Master/Visa के क्रेडिट/डेबिट कार्ड द्वारा।
(iv) UPI द्वारा।

यह ध्यान दिया जा सकता है कि RTI नियम, 2012 के अनुसार गरीबी रेखा से नीचे (BPL) के नागरिकों द्वारा कोई RTI शुल्क देय नहीं है। हालांकि, BPL आवेदक को आवेदन के साथ उपयुक्त सरकार द्वारा जारी प्रमाण पत्र की एक प्रति संलग्न करनी होगी।`
  },
  {
    id: 4,
    category: 'filing',
    questionEn: 'Do I get any receipt for online filing of RTI application?',
    questionHi: 'क्या मुझे ऑनलाइन RTI आवेदन दाखिल करने पर कोई रसीद मिलती है?',
    answerEn: `On submission of an application, a unique registration number will be issued, which may be referred by the applicant for any future reference.

It may be noted that the application filed through this RTI Online Portal will reach electronically to the "Nodal Officer" of the said Ministry/Department and "Not" to the CPIO of the concerned Ministry/Department.

The Nodal Officer will transmit the RTI application electronically to the concerned CPIO.`,
    answerHi: `आवेदन जमा करने पर एक विशिष्ट पंजीकरण संख्या (Registration Number) जारी की जाएगी, जिसे आवेदक भविष्य के किसी भी संदर्भ के लिए उपयोग कर सकता है।

यह ध्यान दिया जाना चाहिए कि इस RTI ऑनलाइन पोर्टल के माध्यम से दायर आवेदन संबंधित मंत्रालय/विभाग के "नोडल अधिकारी" के पास इलेक्ट्रॉनिक रूप से पहुंचेगा, न कि सीधे संबंधित मंत्रालय/विभाग के CPIO के पास।

नोडल अधिकारी RTI आवेदन को इलेक्ट्रॉनिक रूप से संबंधित CPIO को अग्रेषित करेगा।`
  },
  {
    id: 5,
    category: 'general',
    questionEn: 'What will happen to my application if I select a wrong Public Authority in the RTI request form?',
    questionHi: 'यदि मैं RTI अनुरोध फॉर्म में गलत लोक प्राधिकरण चुनता हूँ तो मेरे आवेदन का क्या होगा?',
    answerEn: `In case the RTI application is not meant for the Public authority which has been selected by the applicant, the "Nodal Officer" of the said public authority would transfer the application electronically to the "Nodal Officer" of the concerned Central Public authority, if aligned to this portal and physically to that Central Public authority which is not aligned to this portal, under section 6(3) of the RTI Act.

It may be noted that RTI applications filed through this portal for the state public authorities, including NCT of Delhi, would be returned, without any refund of fee.`,
    answerHi: `यदि RTI आवेदन उस लोक प्राधिकरण के लिए नहीं है जिसे आवेदक द्वारा चुना गया है, तो उक्त लोक प्राधिकरण का "नोडल अधिकारी" RTI अधिनियम की धारा 6(3) के तहत आवेदन को इलेक्ट्रॉनिक रूप से संबंधित केंद्रीय लोक प्राधिकरण (यदि इस पोर्टल से जुड़ा है) या भौतिक रूप से उस केंद्रीय लोक प्राधिकरण को स्थानांतरित करेगा जो इस पोर्टल से नहीं जुड़ा है।

यह ध्यान दिया जाना चाहिए कि राज्य लोक प्राधिकरणों (दिल्ली राष्ट्रीय राजधानी क्षेत्र सहित) के लिए इस पोर्टल के माध्यम से दायर RTI आवेदन बिना किसी शुल्क वापसी के वापस कर दिए जाएंगे।`
  },
  {
    id: 6,
    category: 'fees',
    questionEn: 'Will I be informed about the additional fee (if any) is required to pay?',
    questionHi: 'क्या मुझे अतिरिक्त शुल्क (यदि कोई हो) के भुगतान के बारे में सूचित किया जाएगा?',
    answerEn: `In case additional fee representing the cost is required for providing information, the CPIO will intimate the same, which can be viewed by the applicant through "View Status" option in the RTI Online Portal and an e-mail alert or SMS or both will also be sent to the applicant for the same.

For payment of additional fee online, the applicant needs to use the option 'View Status' in the RTI Online Portal and on providing the registration number of the request, option for "Make Payment" will be available.`,
    answerHi: `यदि जानकारी प्रदान करने की लागत के रूप में अतिरिक्त शुल्क की आवश्यकता होती है, तो CPIO इसकी सूचना देगा, जिसे आवेदक RTI ऑनलाइन पोर्टल में "View Status" विकल्प के माध्यम से देख सकता है और आवेदक को ई-मेल अलर्ट या SMS अथवा दोनों भेजे जाएंगे।

अतिरिक्त शुल्क का ऑनलाइन भुगतान करने के लिए, आवेदक को RTI ऑनलाइन पोर्टल में 'View Status' विकल्प का उपयोग करना होगा और अनुरोध की पंजीकरण संख्या दर्ज करने पर "Make Payment" का विकल्प उपलब्ध होगा।`,
    relatedLink: { href: '/view-status', labelEn: 'Go to View Status', labelHi: 'स्थिति देखें (View Status)' }
  },
  {
    id: 7,
    category: 'appeals',
    questionEn: 'How do I file an appeal with First Appellate Authority?',
    questionHi: 'मैं प्रथम अपीलीय प्राधिकारी (First Appellate Authority) के समक्ष अपील कैसे दायर करूँ?',
    answerEn: `For making an appeal to the first Appellate Authority, the applicant has to select the option "Submit First Appeal" in the RTI Online Portal and fill up the form that will appear.

The registration number and e-mail ID of the original application is required for filing the first appeal.`,
    answerHi: `प्रथम अपीलीय प्राधिकारी को अपील करने के लिए, आवेदक को RTI ऑनलाइन पोर्टल में "Submit First Appeal" विकल्प का चयन करना होगा और दिखाई देने वाले फॉर्म को भरना होगा।

प्रथम अपील दायर करने के लिए मूल आवेदन की पंजीकरण संख्या और ई-मेल आईडी आवश्यक है।`,
    relatedLink: { href: '/first-appeal', labelEn: 'Submit First Appeal', labelHi: 'प्रथम अपील दर्ज करें' }
  },
  {
    id: 8,
    category: 'appeals',
    questionEn: 'Do I need to make any payment for filing an appeal?',
    questionHi: 'क्या अपील दायर करने के लिए मुझे कोई भुगतान करने की आवश्यकता है?',
    answerEn: 'As per RTI Act, no fee has to be paid for first appeal.',
    answerHi: 'RTI अधिनियम के अनुसार प्रथम अपील के लिए कोई शुल्क देय नहीं है।'
  },
  {
    id: 9,
    category: 'general',
    questionEn: 'Do I get any SMS from RTI Online Portal?',
    questionHi: 'क्या मुझे RTI ऑनलाइन पोर्टल से कोई SMS प्राप्त होगा?',
    answerEn: 'Though optional, the mobile number can be provided by the applicant/ appellant in order to receive SMS alerts.',
    answerHi: 'हालांकि यह वैकल्पिक है, फिर भी SMS अलर्ट प्राप्त करने के लिए आवेदक/अपीलकर्ता द्वारा मोबाइल नंबर प्रदान किया जा सकता है।'
  },
  {
    id: 10,
    category: 'tech',
    questionEn: 'What can I do if I forgot my login credentials?',
    questionHi: 'यदि मैं अपना लॉगिन क्रेडेंशियल भूल जाऊं तो मैं क्या कर सकता हूँ?',
    answerEn: 'You can go to View History column to see your past RTI requests/appeals.',
    answerHi: 'आप अपने पिछले RTI अनुरोधों/अपीलों को देखने के लिए \'View History\' (इतिहास देखें) कॉलम में जा सकते हैं।'
  },
  {
    id: 11,
    category: 'general',
    questionEn: 'Is it mandatory to create user account on RTI online web portal?',
    questionHi: 'क्या RTI ऑनलाइन वेब पोर्टल पर उपयोगकर्ता खाता बनाना अनिवार्य है?',
    answerEn: 'No. You can directly file your RTI on "Submit Request" tab.',
    answerHi: 'नहीं। आप सीधे "Submit Request" टैब पर जाकर अपना RTI आवेदन दाखिल कर सकते हैं।',
    relatedLink: { href: '/submit-request', labelEn: 'File RTI Directly', labelHi: 'सीधे RTI दाखिल करें' }
  },
  {
    id: 12,
    category: 'status',
    questionEn: 'How much time RTI request/appeal retain at this portal?',
    questionHi: 'इस पोर्टल पर RTI अनुरोध/अपील कितने समय तक सुरक्षित रहते हैं?',
    answerEn: 'In the View History/View Status citizen can see RTI Cases retained for a period of 3 years.',
    answerHi: 'View History/View Status में नागरिक 3 वर्ष की अवधि तक सुरक्षित रखे गए RTI मामलों को देख सकते हैं।'
  },
  {
    id: 13,
    category: 'fees',
    questionEn: 'What should I do if amount is deducted from my account but registration number is not generated?',
    questionHi: 'यदि मेरे खाते से राशि कट गई है लेकिन पंजीकरण संख्या उत्पन्न नहीं हुई है तो मुझे क्या करना चाहिए?',
    answerEn: `Use "Payment Reconciliation" feature.

Please do not attempt to make payment repeatedly or try to submit request once again. Kindly wait for the 24 to 48 working hours as registration number will be generated after reconciliation. If it is not generated within stipulated time frame then kindly send an e-mail at helprtionline-dopt@nic.in with your transaction details.

However, in cases of unsuccessful RTI payment requests, if the requester wishes to check the payment status before 48 hours, it can be verified using the "Payment Reconciliation" feature.`,
    answerHi: `"Payment Reconciliation" (भुगतान समाधान) सुविधा का उपयोग करें।

कृपया बार-बार भुगतान करने या अनुरोध को फिर से सबमिट करने का प्रयास न करें। कृपया 24 से 48 कार्य घंटों तक प्रतीक्षा करें क्योंकि बैंक समाधान (Reconciliation) के बाद पंजीकरण संख्या उत्पन्न हो जाएगी। यदि निर्धारित समय सीमा के भीतर यह उत्पन्न नहीं होती है, तो कृपया अपने लेनदेन के विवरण के साथ helprtionline-dopt@nic.in पर ई-मेल भेजें।

हालांकि, असफल RTI भुगतान मामलों में, यदि अनुरोधकर्ता 48 घंटों से पहले भुगतान की स्थिति जांचना चाहता है, तो इसे "Payment Reconciliation" सुविधा के माध्यम से सत्यापित किया जा सकता है।`,
    relatedLink: { href: '/payment-reconciliation', labelEn: 'Payment Reconciliation', labelHi: 'भुगतान समाधान' }
  },
  {
    id: 14,
    category: 'appeals',
    questionEn: 'What should I do when portal is not allowing me to file the first appeal?',
    questionHi: 'जब पोर्टल मुझे प्रथम अपील दायर करने की अनुमति नहीं दे रहा हो तो मुझे क्या करना चाहिए?',
    answerEn: `This may happen under following two situations:
1) When your RTI application has been physically transferred to other public authority, which is not aligned to this portal. In such a case, you are required to file your appeal in physical mode to the concerned public authority.
2) Another case can be if your RTI application has not been replied to by CPIO and 30 days period has not lapsed. In such a case, you may file first appeal only after completion of stipulated time period of 30 days.`,
    answerHi: `ऐसा निम्नलिखित दो स्थितियों में हो सकता है:
1) जब आपका RTI आवेदन भौतिक रूप से किसी अन्य लोक प्राधिकरण को स्थानांतरित कर दिया गया हो, जो इस पोर्टल से संरेखित नहीं है। ऐसे मामले में, आपको संबंधित लोक प्राधिकरण को भौतिक मोड (कागजी रूप) में अपनी अपील दायर करनी होगी।
2) दूसरा मामला यह हो सकता है कि आपके RTI आवेदन का CPIO द्वारा उत्तर नहीं दिया गया है और 30 दिनों की अवधि अभी समाप्त नहीं हुई है। ऐसी स्थिति में, आप 30 दिनों की निर्धारित अवधि पूरी होने के बाद ही प्रथम अपील दायर कर सकते हैं।`
  },
  {
    id: 15,
    category: 'appeals',
    questionEn: 'Can I file online first appeal for any RTI application filed physically in the first place?',
    questionHi: 'क्या मैं शुरुआत में भौतिक (ऑफलाइन) रूप से दायर किए गए किसी RTI आवेदन के लिए ऑनलाइन प्रथम अपील दायर कर सकता हूँ?',
    answerEn: 'No, Online first appeal can only be filed against previously filed online RTI application.',
    answerHi: 'नहीं, ऑनलाइन प्रथम अपील केवल पूर्व में ऑनलाइन दाखिल किए गए RTI आवेदन के विरुद्ध ही दायर की जा सकती है।'
  },
  {
    id: 16,
    category: 'status',
    questionEn: 'Why RTI application filed by me is not reflecting in my user account history?',
    questionHi: 'मेरे द्वारा दायर किया गया RTI आवेदन मेरे उपयोगकर्ता खाते के इतिहास में क्यों दिखाई नहीं दे रहा है?',
    answerEn: 'If you have opted to file RTI or First Appeal directly i.e without logging into your user account, then in such cases you will not be able to see the filed RTI or Appeal in your registered account\'s history. However you can always check its status in "View Status" with the provided Reg. Nos.',
    answerHi: 'यदि आपने अपने उपयोगकर्ता खाते में लॉगिन किए बिना सीधे RTI या प्रथम अपील दायर करने का विकल्प चुना है, तो ऐसे मामलों में आप अपने पंजीकृत खाते के इतिहास में दायर RTI या अपील नहीं देख पाएंगे। हालांकि, आप प्रदान की गई पंजीकरण संख्या के साथ "View Status" में हमेशा इसकी स्थिति देख सकते हैं।',
    relatedLink: { href: '/view-status', labelEn: 'Track via View Status', labelHi: 'स्थिति देखें (View Status)' }
  },
  {
    id: 17,
    category: 'filing',
    questionEn: 'Why I have received multiple RTI registration numbers, even though I have filed single RTI application?',
    questionHi: 'मुझे एक ही RTI आवेदन दायर करने के बावजूद एकाधिक RTI पंजीकरण संख्याएँ क्यों प्राप्त हुई हैं?',
    answerEn: 'This is the case where in your RTI application has been forwarded to multiple CPIOs since the information sought lies with more than one PIO.',
    answerHi: 'यह वह मामला है जहाँ आपका RTI आवेदन कई CPIOs को अग्रेषित किया गया है क्योंकि मांगी गई जानकारी एक से अधिक जन सूचना अधिकारियों (PIOs) के पास है।'
  },
  {
    id: 18,
    category: 'status',
    questionEn: 'How can I View Status/Reply of my RTI Application or First Appeal?',
    questionHi: 'मैं अपने RTI आवेदन या प्रथम अपील की स्थिति/उत्तर कैसे देख सकता हूँ?',
    answerEn: 'Status/Reply of the RTI Application or First appeal filed online can be viewed by the applicant by clicking on "View Status".',
    answerHi: 'ऑनलाइन दायर किए गए RTI आवेदन या प्रथम अपील की स्थिति/उत्तर आवेदक द्वारा "View Status" पर क्लिक करके देखा जा सकता है।',
    relatedLink: { href: '/view-status', labelEn: 'Check Status Now', labelHi: 'अभी स्थिति जांचें' }
  },
  {
    id: 19,
    category: 'fees',
    questionEn: 'What if the Registration Number is not received on my Email or Mobile No. even after 48 working Hours?',
    questionHi: '48 कार्य घंटों के बाद भी यदि मेरे ईमेल या मोबाइल नंबर पर पंजीकरण संख्या प्राप्त नहीं होती है तो क्या करें?',
    answerEn: 'Registration Numbers are generated after reconciliation of bank scrolls for cases whose numbers are not generated instantly after the payment. This procedure may take 24 to 48 working hours. If someone still does not receive the Registration Number, they may contact their respective bank for refund of amount.',
    answerHi: 'भुगतान के तुरंत बाद जिन मामलों में पंजीकरण संख्या उत्पन्न नहीं होती है, उनके लिए बैंक स्क्रॉल के समाधान के बाद पंजीकरण संख्या उत्पन्न की जाती है। इस प्रक्रिया में 24 से 48 कार्य घंटे लग सकते हैं। यदि किसी को फिर भी पंजीकरण संख्या प्राप्त नहीं होती है, तो वे राशि की वापसी के लिए अपने संबंधित बैंक से संपर्क कर सकते हैं।'
  },
  {
    id: 20,
    category: 'filing',
    questionEn: 'How to upload a supporting document if an alert comes as "SUPPORTING DOCUMENTS REQUIRED FROM APPLICANT"?',
    questionHi: 'यदि "SUPPORTING DOCUMENTS REQUIRED FROM APPLICANT" (आवेदक से सहायक दस्तावेज आवश्यक) अलर्ट आता है तो सहायक दस्तावेज कैसे अपलोड करें?',
    answerEn: `When a Public Authority requests for a supporting document, an alert is sent to the applicant to his/her Mobile or Email Id. In such situation, the applicant is requested to visit the RTI Online Website and enter the details in 'View Status'. Once the detail is entered, the current status of the RTI application is shown along with the option for uploading the supporting document.`,
    answerHi: `जब कोई लोक प्राधिकरण सहायक दस्तावेज का अनुरोध करता है, तो आवेदक के मोबाइल या ईमेल आईडी पर एक अलर्ट भेजा जाता है। ऐसी स्थिति में आवेदक से अनुरोध है कि वह RTI ऑनलाइन वेबसाइट पर जाए और 'View Status' में विवरण दर्ज करे। विवरण दर्ज होने के बाद, सहायक दस्तावेज अपलोड करने के विकल्प के साथ RTI आवेदन की वर्तमान स्थिति प्रदर्शित होगी।`,
    relatedLink: { href: '/view-status', labelEn: 'Upload via View Status', labelHi: 'View Status पर दस्तावेज अपलोड करें' }
  },
  {
    id: 21,
    category: 'tech',
    questionEn: 'What queries can be raised with Helpline Email helprtionline-dopt(at)nic(dot)in?',
    questionHi: 'हेल्पलाइन ईमेल helprtionline-dopt(at)nic(dot)in पर कौन से प्रश्न पूछे जा सकते हैं?',
    answerEn: 'Helpline mail id is exclusively meant for queries or problem being faced while filing the online RTI through this portal. Please do not send mail to this helpline for any other matter or asking for any other details. The reply is limited to RTI online portal of Central Government only.',
    answerHi: 'हेल्पलाइन मेल आईडी विशेष रूप से इस पोर्टल के माध्यम से ऑनलाइन RTI दाखिल करते समय आने वाली समस्याओं या प्रश्नों के लिए है। कृपया किसी अन्य मामले या अन्य विवरण मांगने के लिए इस हेल्पलाइन पर मेल न भेजें। उत्तर केवल केंद्र सरकार के RTI ऑनलाइन पोर्टल तक ही सीमित है।'
  },
  {
    id: 22,
    category: 'tech',
    questionEn: 'What should I do when my browser shows certificate error while opening RTI online portal?',
    questionHi: 'RTI ऑनलाइन पोर्टल खोलते समय जब मेरा ब्राउज़र प्रमाणपत्र त्रुटि (Certificate Error) दिखाए तो मुझे क्या करना चाहिए?',
    answerEn: `You should ignore the certificate error and proceed forward. Kindly select:
• Mozilla Firefox – I understand the risk add exception.
• Google Chrome – Proceed Anyway.
• Internet Explorer / Edge – Continue to this website`,
    answerHi: `आपको प्रमाणपत्र त्रुटि को अनदेखा करके आगे बढ़ना चाहिए। कृपया निम्नानुसार चयन करें:
• Mozilla Firefox – I understand the risk add exception (जोखिम समझें और अपवाद जोड़ें)।
• Google Chrome – Proceed Anyway (आगे बढ़ें)।
• Internet Explorer / Edge – Continue to this website (इस वेबसाइट पर जारी रखें)।`
  },
  {
    id: 23,
    category: 'general',
    questionEn: 'Can I file RTI application for state public authorities through this portal?',
    questionHi: 'क्या मैं इस पोर्टल के माध्यम से राज्य लोक प्राधिकरणों के लिए RTI आवेदन दायर कर सकता हूँ?',
    answerEn: 'No. This Portal is exclusively meant for Public Authorities under Central Govt. only.',
    answerHi: 'नहीं। यह पोर्टल विशेष रूप से केवल केंद्र सरकार के अंतर्गत आने वाले लोक प्राधिकरणों के लिए है।'
  },
  {
    id: 24,
    category: 'appeals',
    questionEn: 'If the RTI application is filed manually, then is it possible to file 1st appeal online?',
    questionHi: 'यदि RTI आवेदन मैनुअल (कागजी रूप से) दायर किया गया है, तो क्या ऑनलाइन प्रथम अपील दायर करना संभव है?',
    answerEn: `Manual applications can be lodged into RTI Online portal by CPIOs and can be disposed off by CPIO online.

In this context, if applicant provides email id/Mobile No. in the application form and CPIO lodges this RTI application in the portal, then the actions taken by CPIO will be conveyed to applicant automatically through e-mail and Mobile SMS.

Then applicant can file 1st appeal with the help of registration number conveyed.`,
    answerHi: `CPIO द्वारा मैनुअल आवेदनों को RTI ऑनलाइन पोर्टल पर दर्ज किया जा सकता है और CPIO द्वारा ऑनलाइन ही उनका निपटारा किया जा सकता है।

इस संदर्भ में, यदि आवेदक आवेदन पत्र में ईमेल आईडी/मोबाइल नंबर प्रदान करता है और CPIO इस RTI आवेदन को पोर्टल में दर्ज करता है, तो CPIO द्वारा की गई कार्रवाई की सूचना आवेदक को स्वचालित रूप से ई-मेल और मोबाइल SMS के माध्यम से दी जाएगी।

तत्पश्चात आवेदक सूचित पंजीकरण संख्या की सहायता से प्रथम अपील दायर कर सकता है।`,
    relatedLink: { href: '/first-appeal', labelEn: 'Submit First Appeal', labelHi: 'प्रथम अपील दर्ज करें' }
  },
  {
    id: 25,
    category: 'fees',
    questionEn: 'What are the reasons for my RTI payment failing?',
    questionHi: 'मेरे RTI भुगतान के विफल होने के क्या कारण हैं?',
    answerEn: `The major reasons for failure are due to Business declines.
Business Declines are as under:
1. Customer has set e-Commerce flag as Disabled for Debit / Credit Card.
2. Customer either closed the internet browser or not proceeded further with the transaction resulting into session timeout.
3. Wrong OTP or no OTP entered by customer.
4. Wrong details of cards entered by customers like Card No, CVV, expiry date.
5. Insufficient balance in customer’s account.
6. Customer cancelled the transaction and reinitiated with different mode of payment (say from Debit card to UPI etc.).
7. Customer received collect request for payment in UPI app, but not completed the payment within time limit.`,
    answerHi: `विफलता के मुख्य कारण व्यावसायिक अस्वीकृति (Business Declines) हैं।
व्यावसायिक अस्वीकृतियाँ निम्नानुसार हैं:
1. ग्राहक ने डेबिट/क्रेडिट कार्ड के लिए ई-कॉमर्स लेनदेन को अक्षम (Disabled) कर रखा है।
2. ग्राहक ने या तो इंटरनेट ब्राउज़र बंद कर दिया या लेनदेन में आगे नहीं बढ़ा, जिसके परिणामस्वरूप सत्र समय समाप्त (Session Timeout) हो गया।
3. ग्राहक द्वारा गलत OTP दर्ज किया गया या कोई OTP दर्ज नहीं किया गया।
4. ग्राहक द्वारा कार्ड का गलत विवरण दर्ज किया गया जैसे कार्ड नंबर, CVV, समाप्ति तिथि।
5. ग्राहक के खाते में अपर्याप्त शेष राशि।
6. ग्राहक ने लेनदेन रद्द कर दिया और भुगतान के दूसरे माध्यम से पुनः प्रयास किया (जैसे डेबिट कार्ड से UPI आदि)।
7. ग्राहक को UPI ऐप में भुगतान के लिए अनुरोध प्राप्त हुआ, लेकिन समय सीमा के भीतर भुगतान पूरा नहीं किया।`
  },
  {
    id: 26,
    category: 'tech',
    questionEn: 'Why this OTP feature is introduced in view status option?',
    questionHi: 'View Status विकल्प में यह OTP सुविधा क्यों शुरू की गई है?',
    answerEn: `RTI Application may contain personal information of the Applicant and if any third person gets the registration number and email id, then the person can view this personal information. So, in order to protect personal information of the applicant, according to cyber security norms, this OTP validating feature has been introduced.

In view status option while OTPs are promptly dispatched from the NIC email domain, delays may occasionally occur due to high traffic on either NIC server or external email services like Gmail or Yahoo. Importantly, OTPs do not expire until they are used, meaning users can access the status of their applications as soon as the OTP arrives.`,
    answerHi: `RTI आवेदन में आवेदक की व्यक्तिगत जानकारी हो सकती है और यदि किसी तीसरे व्यक्ति को पंजीकरण संख्या और ईमेल आईडी मिल जाती है, तो वह व्यक्ति इस व्यक्तिगत जानकारी को देख सकता है। इसलिए, साइबर सुरक्षा मानकों के अनुसार आवेदक की व्यक्तिगत जानकारी की सुरक्षा के लिए यह OTP सत्यापन सुविधा शुरू की गई है।

View Status विकल्प में यद्यपि NIC ईमेल डोमेन से OTP तुरंत भेजे जाते हैं, फिर भी NIC सर्वर या बाहरी ईमेल सेवाओं जैसे Gmail या Yahoo पर भारी ट्रैफिक के कारण कभी-कभी देरी हो सकती है। महत्वपूर्ण बात यह है कि OTP का उपयोग किए जाने तक वे समाप्त (Expire) नहीं होते हैं, जिसका अर्थ है कि OTP आते ही उपयोगकर्ता अपने आवेदनों की स्थिति देख सकते हैं।`
  }
];

export default function FAQsPage() {
  const { language, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(1);

  const isHindi = language === 'hi';

  const countsByCategory = useMemo(() => {
    const counts = { all: FAQ_DATA.length };
    FAQ_CATEGORIES.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = FAQ_DATA.filter(f => f.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch = 
        faq.questionEn.toLowerCase().includes(query) ||
        faq.questionHi.toLowerCase().includes(query) ||
        faq.answerEn.toLowerCase().includes(query) ||
        faq.answerHi.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden bg-[#FAFAFC]">
      {/* Background Texture */}
      <DottedWave />

      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 relative z-10">
        {/* Breadcrumb Trail */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">
            {t?.submitRequest?.breadcrumbHome || 'Home'}
          </Link>
          <span className="text-slate-300 shrink-0">&gt;</span>
          <span className="font-semibold text-slate-800 shrink-0">
            {isHindi ? 'सामान्यतः पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </span>
        </div>

        {/* Header Hero Area with Generous Whitespace */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1C3F] tracking-tight mb-4 leading-tight">
            {isHindi ? 'सामान्यतः पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            {isHindi
              ? 'RTI आवेदन दाखिल करने, वैधानिक ₹10 शुल्क भुगतान, BPL छूट, 30-दिवसीय समय-सीमा एवं प्रथम अपील से संबंधित आधिकारिक नियम व प्रक्रियाएं।'
              : 'Official answers regarding statutory application filing, ₹10 fee payments, BPL exemptions under Section 7(5), status tracking, and First Appeal procedures under the RTI Act, 2005.'}
          </p>

          {/* Search Box */}
          <div className="w-full max-w-xl mx-auto relative shadow-2xs rounded-xl bg-white border border-slate-300 focus-within:ring-2 focus-within:ring-[#2563EB]/15 focus-within:border-[#2563EB] transition-all">
            <div className="flex items-center px-3.5 py-2.5 sm:py-3">
              <SearchIcon className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHindi ? 'विषय या कीवर्ड खोजें (उदा. शुल्क, अपील, रसीद)...' : 'Search questions (e.g. fees, appeal, receipt, 3000 chars)...'}
                className="w-full text-xs sm:text-sm text-gray-800 placeholder-slate-400 bg-transparent outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold px-1.5 py-0.5 cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = countsByCategory[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer select-none ${
                  isSelected
                    ? 'bg-[#0B1C3F] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{isHindi ? cat.labelHi : cat.labelEn}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results summary bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-0.5">
          <span>
            {isHindi 
              ? `${filteredFaqs.length} प्रश्न प्रदर्शित` 
              : `Showing ${filteredFaqs.length} of ${FAQ_DATA.length} FAQs`}
            {searchQuery && ` for "${searchQuery}"`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenFaq(openFaq ? null : filteredFaqs[0]?.id || 1)}
              className="text-[#2563EB] hover:underline font-semibold text-xs cursor-pointer"
            >
              {openFaq ? (isHindi ? 'सक्रिय बंद करें' : 'Collapse Active') : (isHindi ? 'पहला खोलें' : 'Expand First')}
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-2.5">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
              <InformationCircleIcon className="w-7 h-7 text-slate-400 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                {isHindi ? 'कोई प्रश्न नहीं मिला।' : 'No FAQs found matching your query.'}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-2.5 text-xs text-[#2563EB] hover:underline font-bold"
              >
                {isHindi ? 'सभी प्रश्न रीसेट करें' : 'Reset search and filters'}
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white border rounded-xl transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-[#2563EB]/50 shadow-xs' : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full text-left px-4 sm:px-5 py-3.5 flex items-start justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-blue-50 text-[#1a4bba] text-[11px] font-bold mt-0.5 border border-blue-100">
                        {faq.id}
                      </span>
                      <span className="text-xs sm:text-sm md:text-[15px] font-bold text-[#0B1C3F] leading-snug">
                        {isHindi ? faq.questionHi : faq.questionEn}
                      </span>
                    </div>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-slate-400 shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#2563EB]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-4 pt-2.5 text-xs sm:text-sm text-slate-700 font-normal leading-relaxed border-t border-slate-100 bg-slate-50/40">
                          <div className="whitespace-pre-line text-slate-700 font-normal leading-relaxed space-y-1.5">
                            {isHindi ? faq.answerHi : faq.answerEn}
                          </div>

                          {faq.relatedLink && (
                            <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-start">
                              <Link
                                href={faq.relatedLink.href}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0B1C3F] text-white text-xs font-semibold hover:bg-[#152e60] transition-colors shadow-2xs"
                              >
                                <span>{isHindi ? faq.relatedLink.labelHi : faq.relatedLink.labelEn}</span>
                                <ArrowRightIcon className="w-3 h-3" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Support Help Desk Banner */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#0B1C3F]">
                {isHindi ? 'क्या आपका कोई अन्य प्रश्न है?' : 'Still have questions?'}
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                {isHindi 
                  ? 'नागरिक हेल्पलाइन: 1800-11-4000 • ईमेल: helprtionline-dopt@nic.in' 
                  : 'Citizen Helpline: Toll-Free 1800-11-4000 • Email: helprtionline-dopt@nic.in'}
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="shrink-0 bg-[#0B1C3F] hover:bg-[#152e60] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>{isHindi ? 'संपर्क करें' : 'Contact Support'}</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

