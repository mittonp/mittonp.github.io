<?php
/**
* Plugin Name: SG Calculator
* Plugin URI: 
* Description: SG Calculator
* Version: 1.0.0
* Author: 
* Author URI:
* Text Domain:
* Domain Path:https://www.bmtqs.com.au/tax-depreciation-calculator
*
*/

define ('SG_CALCULATOR_URL', plugin_dir_url( __FILE__ ));

if (!function_exists('sg_cal_shortcode')) {
    function sg_cal_shortcode($atts, $content) {
    

        $atts = shortcode_atts( array(
            'brand' => '',
            'title' => '',
            'thumb' => '',
            'checkout' => '',
            'top' => '',           
        ), $atts );

        ob_start();
        ?>
        <div class="sg-cal-wrap">
            <div class="input-group row" id="step1" >
                <div class="sub-header">
                    <h2 class="text-center">Rethink Investing Financial Calculator</h2>
                    <p class="text-center">Fill out the fields with your budget data to get a full breakdown of your growth potential.</p>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="input-field">
                            <div class="col2">
                                <label>Purchase Price</label>
                            </div>
                            <span class="col2">
                                <input type="text" id="d3"  name="d3" class="input currency" value="800000">
                            </span>                            
                        </div>

                        <div class="input-field">
                            <div class="col2">
                                <label>Deposit %</label>
                            </div>
                            <span class="col2">
                                <input type="text" id="d4"  name="d4" class="input percent " value="30">
                            </span>                            
                        </div>
                        <!--
                        <div class="input-field">
                            <div class="col2">
                                <label>Deposit Total</label>
                            </div>
                            <span class="col2">
                                <input type="text" id="d5"  name="d5">
                            </span>                            
                        </div>

                        <div class="input-field">
                            <div class="col2">
                                <label>Loan Amount</label>
                            </div>
                            <span class="col2">
                                <input type="text" id="d6"  name="d6">
                            </span>                            
                        </div>

                        <div class="input-field">
                            <div class="col2">
                                <label>Stamp Duty</label>
                            </div>
                            <span class="col2">
                                <input type="text" id="d7"  name="d7">
                            </span>                            
                        </div>

                        <div class="input-field">
                            <div class="col2">
                                <label>Total Acquisition Costs</label>
                            </div>
                            <span class="col2">
                                <input type="text" id="d10"  name="d10">
                            </span>                            
                        </div> -->

                        <div class="input-field">
                            <div class="col2">
                                <label>Additional. Purchasing Costs</label>
                            </div>
                            <span class="col2">
                                <input type="text" id="d8"  name="d8" class="input currency" value="3000">
                            </span>                            
                        </div>

                        <div class="input-field">
                            <div class="col2">
                                <label>Loan Interest Rate %</label>
                            </div>
                            <span class="col2">
                                <input type="text" id="d11"  name="d11" class="input percent" value="4">
                            </span>                            
                        </div>
                        <!--
                        <div class="input-field">
                            <div class="col2">
                                <label>Net Rent</label>
                            </div>
                            <span class="col2">
                                <input type="text" id="d12"  name="d12">
                            </span>                            
                        </div>
                        -->

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-field">
                        <div class="col2">
                            <label>Expected Rental Yield (net %)</label>
                        </div>
                        <span class="col2">                            
                            <select id="g3" name="g3">
                                <option>6.5%</option>
                                <option>7%</option>
                                <option>7.5%</option>
                                <option>8%</option>
                                <option>8.5%</option>
                                <option>9%</option>
                            </select>
                        </span>                            
                    </div>

                    <div class="input-field">
                        <div class="col2">
                            <label>Rental Increases %</label>
                        </div>
                        <span class="col2">
                            <input type="text" id="g4"  name="g4" class="input percent" value="3">
                        </span>                            
                    </div>

                    <div class="input-field">
                        <div class="col2">
                            <label>Expected Depreciation</label>
                        </div>
                        <span class="col2">
                            <input type="text" id="g5"  name="g5" class="input currency" value="5000">
                        </span>                            
                    </div>

                    <div class="input-field">
                        <div class="col2">
                            <label>Year 1 Expected Outgoings</label>
                        </div>
                        <span class="col2">
                            <input type="text" id="d16"  name="d16" class="input currency" value="500">
                        </span>                            
                    </div>

                    <div class="input-field">
                        <div class="col2">
                            <label>Year 1 Miscellaneous Expenses</label>
                        </div>
                        <span class="col2">
                            <input type="text" id="d17"  name="d17" class="input currency" value="800">
                        </span>                            
                    </div>

                </div>
                <div class="col-12 button-wrapper">
                    <div>
                        <button id="btn-calculator" class="btn-cal">Get Your 10 Year Forecast ></button>
                    </div>
                </div>
            </div>
            <div id="step2">
                <div class="sub-header">
                    <h2 class="text-center">Rethink Investing Financial Calculator</h2>
                    <p class="text-center">See how your investment performs over a 10 year period.</p>
                </div>
                <div class="mobile_clicker">
                    <span class="dot active" data-index="0"></span>
                    <span class="dot" data-index="1"></span>
                    <span class="dot" data-index="2"></span>
                    <span class="dot" data-index="3"></span>
                </div>
                <div class="show_tables">
                </div>
                <div class="mobile_clicker">
                    <span class="dot active" data-index="0"></span>
                    <span class="dot" data-index="1"></span>
                    <span class="dot" data-index="2"></span>
                    <span class="dot" data-index="3"></span>
                </div>

                <div style="width: 100%;" class="graph-wrapper">                    
                    <canvas id="canvas-1">
                </div>
                
                <div class="button-wrapper"><button class="btn-previous" id="btn-next">Start Over</button></div>
            </div>
            
           
        </div>
        <?php
        $html = ob_get_contents();
        ob_end_clean();

        return $html;
    }
}

if (!function_exists('sg_cal_style')) {
    function sg_cal_style() {
        wp_enqueue_style( 'sg-opensans', "https://fonts.googleapis.com/css?family=Open+Sans&display=swap" );
        // wp_enqueue_style( 'sg-jquery-ui', "http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" );
        wp_enqueue_style( 'sg-cal-style', SG_CALCULATOR_URL . "/style.css" );

        wp_enqueue_script( 'jquery-ui-selectmenu' );
        wp_enqueue_script( 'sg-chart-stscript', "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" );
        wp_enqueue_script( 'sg-cal-stscript', SG_CALCULATOR_URL . "/js/script.js" );

    }
}

add_action('wp_enqueue_scripts','sg_cal_style');
add_shortcode( 'sg_cal',  'sg_cal_shortcode' );